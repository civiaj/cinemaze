import mongoose, { QueryOptions, Types } from "mongoose";
import ApiError from "../exceptions/api.error";
import favoriteModel, { Favorite, FavoriteItem } from "../model/favorite.model";
import {
    CreateFavoriteInput,
    GetFavoriteAllInput,
    RemoveFavoriteOneInput,
} from "../schema/favorite.schema";
import makeSet from "../utils/makeSet";
import { FavoriteEntity, FavoritesTotal, Film } from "../types/types";

const pageSize = 20;
const sortBy = "favorites.updatedAt";
const order = -1;

type ModifyFavorite = {
    userId: number;
    filmId: number;
    filmDocumentId: Types.ObjectId;
    payload: CreateFavoriteInput["favorite"];
};

class FavoriteService {
    async createOne(user: Types.ObjectId, options: QueryOptions = {}) {
        return (await favoriteModel.create([{ user }], options))[0];
    }
    async removeOne(userId: number, session: mongoose.mongo.ClientSession) {
        return await favoriteModel.deleteOne({ user: userId }, { session });
    }

    async updateOne({ filmDocumentId, filmId, payload, userId }: ModifyFavorite) {
        const exists = Boolean((await this.getFavorite(userId, filmDocumentId)).length);

        return exists
            ? this.updateEntity({ userId, filmDocumentId, payload })
            : this.createEntity({ userId, filmDocumentId, payload, filmId });
    }

    async getOne(userId: number, filmDocumentId: Types.ObjectId): Promise<FavoriteEntity | null> {
        const result = await favoriteModel.aggregate([
            { $match: { user: mongoose.Types.ObjectId.createFromHexString(String(userId)) } },
            { $unwind: "$favorites" },
            { $match: { "favorites.film": filmDocumentId } },
            { $limit: 1 },
            {
                $project: {
                    _id: 0,
                    user: 0,
                    "favorites._id": 0,
                    "favorites.film": 0,
                    "favorites.createdAt": 0,
                    "favorites.updatedAt": 0,
                },
            },
        ]);
        if (!result.length) return null;
        return result[0].favorites;
    }

    async getAll(userId: string, pageNumber: number, filter: GetFavoriteAllInput["filter"]) {
        const skip = (pageNumber - 1) * pageSize;
        let match = { $match: {} };
        switch (filter) {
            case "bookmarked":
            case "hidden": {
                match = { $match: { [`favorites.${filter}`]: true } };
                break;
            }
            case "userScore": {
                match = { $match: { [`favorites.${filter}`]: { $ne: null } } };
                break;
            }
        }
        const result: { films: Film[]; total: { count: number }[] }[] =
            await favoriteModel.aggregate([
                {
                    $match: {
                        user: mongoose.Types.ObjectId.createFromHexString(String(userId)),
                    },
                },
                { $unwind: "$favorites" },
                match,
                { $sort: { [sortBy]: order } },
                {
                    $facet: {
                        films: [
                            {
                                $lookup: {
                                    from: "films",
                                    localField: "favorites.film",
                                    foreignField: "_id",
                                    as: "film",
                                },
                            },
                            { $unwind: "$film" },
                            {
                                $project: {
                                    _id: 0,
                                    id: "$film.id",
                                    countries: "$film.countries",
                                    filmLengthHours: "$film.filmLengthHours",
                                    filmLengthMins: "$film.filmLengthMins",
                                    genres: "$film.genres",
                                    nameEn: "$film.nameEn",
                                    nameOriginal: "$film.nameOriginal",
                                    nameRu: "$film.nameRu",
                                    posterUrlPreview: "$film.posterUrlPreview",
                                    rating: "$film.rating",
                                    year: "$film.year",
                                    favorite: {
                                        userScore: "$favorites.userScore",
                                        bookmarked: "$favorites.bookmarked",
                                        hidden: "$favorites.hidden",
                                    },
                                },
                            },
                            { $skip: skip },
                            { $limit: pageSize },
                        ],
                        total: [
                            {
                                $group: {
                                    _id: null,
                                    count: { $sum: 1 },
                                },
                            },
                        ],
                    },
                },
            ]);
        const { films, total } = result[0];
        return { films, totalPages: Math.ceil(total[0].count / pageSize) };
    }

    async getStatsTotal(userId: number): Promise<FavoritesTotal> {
        const result: { favorites: FavoriteEntity }[] = await favoriteModel.aggregate([
            { $match: { user: mongoose.Types.ObjectId.createFromHexString(String(userId)) } },
            { $unwind: "$favorites" },
            {
                $project: {
                    _id: 0,
                    "favorites.bookmarked": 1,
                    "favorites.userScore": 1,
                    "favorites.hidden": 1,
                },
            },
        ]);

        const initial: FavoritesTotal = {
            all: 0,
            userScore: 0,
            bookmarked: 0,
            hidden: 0,
        };

        const data = result.reduce((acc, curr, _index, arr): FavoritesTotal => {
            if (!acc.all) acc.all = arr.length;
            const { favorites } = curr;
            const { userScore, bookmarked, hidden } = favorites;
            const entities: [key: keyof FavoritesTotal, value: number | null | boolean][] = [
                ["userScore", userScore],
                ["bookmarked", bookmarked],
                ["hidden", hidden],
            ];
            entities.forEach(([key, value]) => {
                if (value) {
                    acc[key] += 1;
                }
            });
            return acc;
        }, initial);

        return data;
    }

    async removeField({
        field,
        filmDocumentId,
        userId,
    }: Pick<ModifyFavorite, "filmDocumentId" | "userId"> & {
        field: RemoveFavoriteOneInput["field"];
    }) {
        return field === "all"
            ? this.removeFavorite(userId, filmDocumentId)
            : this.updateEntity({
                  userId,
                  filmDocumentId,
                  payload: {
                      [field]: null,
                  },
              });
    }

    async getStats(userId: number) {
        const result = await favoriteModel.aggregate([
            { $match: { user: mongoose.Types.ObjectId.createFromHexString(String(userId)) } },
            { $unwind: "$favorites" },
            {
                $lookup: {
                    from: "films",
                    localField: "favorites.film",
                    foreignField: "_id",
                    as: "favorites.film",

                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                id: 1,
                                genres: "$genres.genre",
                                countries: "$countries.country",
                                nameRu: 1,
                                rating: 1,
                                year: 1,
                            },
                        },
                    ],
                },
            },
            { $sort: { [sortBy]: 1 } },
            {
                $project: {
                    _id: 0,
                    user: 0,
                    "favorites._id": 0,
                    "favorites.createdAt": 0,
                },
            },
        ]);

        return result.map((item) => {
            const { favorites } = item;
            const { film, ...otherFields } = favorites;
            return { ...film[0], ...otherFields };
        });
    }

    async hydrateByIds(
        userId: number,
        ids: number[]
    ): Promise<Pick<FavoriteItem, "bookmarked" | "userScore" | "filmId" | "hidden">[]> {
        const data = await favoriteModel.aggregate([
            { $match: { user: mongoose.Types.ObjectId.createFromHexString(String(userId)) } },
            { $unwind: "$favorites" },
            { $match: { "favorites.filmId": { $in: ids } } },
            { $replaceRoot: { newRoot: "$favorites" } },
            {
                $project: {
                    _id: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    film: 0,
                },
            },
        ]);

        return data;
    }

    async hydrateOne(userId: number, filmId: string) {
        const result = await favoriteModel.aggregate([
            { $match: { user: mongoose.Types.ObjectId.createFromHexString(String(userId)) } },
            { $unwind: "$favorites" },
            { $match: { "favorites.filmId": Number(filmId) } },
            { $limit: 1 },
            {
                $project: {
                    _id: 0,
                    user: 0,
                    "favorites._id": 0,
                    "favorites.film": 0,
                    "favorites.createdAt": 0,
                    "favorites.updatedAt": 0,
                },
            },
        ]);
        if (!result.length) return null;
        return result[0].favorites;
    }

    private async createEntity({ userId, filmDocumentId, payload, filmId }: ModifyFavorite) {
        const addToSet = { favorites: { film: filmDocumentId, filmId, ...payload } };
        return favoriteModel.updateOne({ user: userId }, { $addToSet: addToSet }, { upsert: true });
    }

    private async updateEntity({
        filmDocumentId,
        payload,
        userId,
    }: Omit<ModifyFavorite, "filmId">) {
        const updateResult = await favoriteModel.updateOne(
            { user: userId, "favorites.film": filmDocumentId },
            { $set: makeSet(payload) }
        );
        const favorite = await this.getFavorite(userId, filmDocumentId);
        if (!favorite) return ApiError.MongooseError();

        const { bookmarked, hidden, userScore } = favorite[0].favorites;
        if ([bookmarked, hidden, userScore].every((p) => !p)) {
            return this.removeFavorite(userId, filmDocumentId);
        }

        return updateResult;
    }

    private async getFavorite(
        userId: number,
        filmDocumentId: Types.ObjectId
    ): Promise<{ favorites: Favorite["favorites"][0] }[] | []> {
        return favoriteModel.aggregate([
            { $match: { user: mongoose.Types.ObjectId.createFromHexString(String(userId)) } },
            { $unwind: "$favorites" },
            { $match: { "favorites.film": filmDocumentId } },
            { $limit: 1 },
        ]);
    }

    private async removeFavorite(userId: number, filmDocumentId: Types.ObjectId) {
        return favoriteModel.updateOne(
            { user: userId, "favorites.film": filmDocumentId },
            { $pull: { favorites: { film: filmDocumentId } } }
        );
    }
}

export default new FavoriteService();
