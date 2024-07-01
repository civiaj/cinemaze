import mongoose, { QueryOptions, Types } from "mongoose";
import ApiError from "../exceptions/api.error";
import favoriteModel, { Favorite, FavoriteItem } from "../model/favorite.model";
import {
    CreateFavoriteInput,
    GetFavoriteAllInput,
    RemoveFavoriteOneInput,
} from "../schema/favorite.schema";
import makeSet from "../utils/makeSet";
import { FavoriteEntity } from "../types/types";

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
        const result = await favoriteModel.aggregate([
            {
                $facet: {
                    data: [
                        {
                            $match: {
                                user: mongoose.Types.ObjectId.createFromHexString(String(userId)),
                            },
                        },
                        { $unwind: "$favorites" },
                        match,
                        {
                            $lookup: {
                                from: "films",
                                localField: "favorites.film",
                                foreignField: "_id",
                                as: "favorites.film",
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                user: 0,
                                "favorites._id": 0,
                                "favorites.film._id": 0,
                                "favorites.film.countries._id": 0,
                                "favorites.film.genres._id": 0,
                                "favorites.bookmarked": 0,
                                "favorites.hidden": 0,
                                "favorites.createdAt": 0,
                                "favorites.updatedAt": 0,
                            },
                        },
                        { $sort: { [sortBy]: order } },
                        { $skip: skip },
                        { $limit: pageSize },
                    ],
                    total: [
                        {
                            $match: {
                                user: mongoose.Types.ObjectId.createFromHexString(String(userId)),
                            },
                        },
                        {
                            $unwind: "$favorites",
                        },
                        match,
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

        const totalPages = Math.ceil(result[0]?.total[0]?.count / pageSize) || 0;
        const films = result[0]?.data?.map(
            (item: {
                favorites: {
                    film: Favorite[];
                    userScore: FavoriteItem["userScore"];
                    filmId: FavoriteItem["filmId"];
                };
            }) => {
                const { favorites } = item;
                const { film, userScore } = favorites;
                return { ...film[0], favorite: { userScore } };
            }
        );
        return { films, totalPages };
    }

    async getStatsTotal() {}

    // async getFavoriteSyncData(userId: number) {
    //     const result = await favoriteModel.aggregate([
    //         { $match: { user: mongoose.Types.ObjectId.createFromHexString(String(userId)) } },
    //         { $unwind: "$favorites" },
    //         {
    //             $lookup: {
    //                 from: "films",
    //                 localField: "favorites.film",
    //                 foreignField: "_id",
    //                 as: "favorites.film",

    //                 pipeline: [
    //                     {
    //                         $project: {
    //                             _id: 0,
    //                             id: "$id",
    //                         },
    //                     },
    //                 ],
    //             },
    //         },
    //         {
    //             $project: {
    //                 _id: 0,
    //                 user: 0,
    //                 "favorites._id": 0,
    //                 "favorites.createdAt": 0,
    //                 "favorites.updatedAt": 0,
    //             },
    //         },
    //     ]);

    //     return result.reduce(
    //         (
    //             acc: {
    //                 films: FavoriteItem[];
    //                 bookmarked: number;
    //                 userScore: number;
    //                 hidden: number;
    //                 all: number;
    //             },
    //             item,
    //             index,
    //             arr
    //         ) => {
    //             if (!acc.all) acc.all = arr.length;
    //             const { favorites } = item;
    //             const { film, ...otherFields } = favorites;
    //             const newItem = { ...film[0], ...otherFields };
    //             acc.films[index] = newItem;
    //             const { userScore, bookmarked, hidden } = otherFields;
    //             acc.userScore = userScore ? acc.userScore + 1 : acc.userScore;
    //             acc.bookmarked = bookmarked ? acc.bookmarked + 1 : acc.bookmarked;
    //             acc.hidden = hidden ? acc.hidden + 1 : acc.hidden;
    //             return acc;
    //         },
    //         { hidden: 0, userScore: 0, bookmarked: 0, films: [] }
    //     );
    // }

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
        const result = await favoriteModel.aggregate([
            { $match: { user: mongoose.Types.ObjectId.createFromHexString(String(userId)) } },
            { $unwind: "$favorites" },
            { $match: { "favorites.filmId": { $in: ids } } },
            {
                $project: {
                    _id: 0,
                    user: 0,
                    "favorites._id": 0,
                    "favorites.createdAt": 0,
                    "favorites.updatedAt": 0,
                },
            },
        ]);

        const data = result?.map(
            (item: {
                favorites: Pick<
                    FavoriteItem,
                    "bookmarked" | "userScore" | "filmId" | "hidden" | "film"
                >;
            }) => {
                const { favorites } = item;
                const { film, ...other } = favorites;
                return other;
            }
        );

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

        console.log({ payload, updateResult });
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
