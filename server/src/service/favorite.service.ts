import mongoose, { QueryOptions, Types } from "mongoose";
import ApiError from "../exceptions/api.error";
import favoriteModel, { Favorite } from "../model/favorite.model";
import {
    CreateFavoriteInput,
    GetFavoriteAllInput,
    RemoveFavoriteOneInput,
} from "../schema/favorite.schema";
import makeSet from "../utils/makeSet";

const pageSize = 20;
const sortBy = "favorites.updatedAt";
const order = -1;

class FavoriteService {
    async createFavoriteUser(user: Types.ObjectId, options: QueryOptions = {}) {
        return (await favoriteModel.create([{ user }], options))[0];
    }
    async deleteFavorite(userId: number, session: mongoose.mongo.ClientSession) {
        return await favoriteModel.deleteOne({ user: userId }, { session });
    }

    async modifyFavorite(
        userId: number,
        filmDocumentId: Types.ObjectId,
        payload: CreateFavoriteInput["favorite"]
    ) {
        const exists = Boolean((await this.getFavorite(userId, filmDocumentId)).length);

        return exists
            ? this.updateFavorite(userId, filmDocumentId, payload)
            : this.createFavorite(userId, filmDocumentId, payload);
    }

    async getFavoriteData(userId: number, filmDocumentId: Types.ObjectId) {
        const result = await favoriteModel.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
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

        if (!result.length) return { bookmarked: false, hidden: false, userScore: null };

        return result[0].favorites;
    }

    async getFavoriteAll(
        userId: string,
        pageNumber: number,
        filter: GetFavoriteAllInput["filter"]
    ) {
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
                        { $match: { user: new mongoose.Types.ObjectId(userId) } },
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
                                "favorites.userScore": 0,
                                "favorites.hidden": 0,
                            },
                        },
                        { $sort: { [sortBy]: order } },
                        { $skip: skip },
                        { $limit: pageSize },
                    ],
                    total: [
                        {
                            $match: { user: new mongoose.Types.ObjectId(userId) },
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
        const films = result[0]?.data?.map((item: any) => {
            const { favorites } = item;
            const { film, ...otherFields } = favorites;
            return { ...film[0], ...otherFields };
        });
        return { films, totalPages };
    }

    async getFavoriteSyncData(userId: number) {
        const result = await favoriteModel.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
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
                                filmId: "$filmId",
                            },
                        },
                    ],
                },
            },
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

        return result.reduce(
            (
                acc: {
                    films: any[];
                    bookmarked: number;
                    userScore: number;
                    hidden: number;
                    all: number;
                },
                item,
                index,
                arr
            ) => {
                if (!acc.all) acc.all = arr.length;
                const { favorites } = item;
                const { film, ...otherFields } = favorites;
                const newItem = { ...film[0], ...otherFields };
                acc.films[index] = newItem;
                const { userScore, bookmarked, hidden } = otherFields;
                acc.userScore = userScore ? acc.userScore + 1 : acc.userScore;
                acc.bookmarked = bookmarked ? acc.bookmarked + 1 : acc.bookmarked;
                acc.hidden = hidden ? acc.hidden + 1 : acc.hidden;
                return acc;
            },
            { hidden: 0, userScore: 0, bookmarked: 0, films: [] }
        );
    }

    async removeFavoriteField(
        userId: number,
        filmDocumentId: Types.ObjectId,
        payload: Omit<RemoveFavoriteOneInput, "filmId">
    ) {
        const { field } = payload;
        return field === "all"
            ? this.removeFavorite(userId, filmDocumentId)
            : this.updateFavorite(userId, filmDocumentId, {
                  [field]: field === "userScore" ? null : false,
              });
    }

    async getFavoriteStatistics(userId: number) {
        const result = await favoriteModel.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
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
                                filmId: 1,
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

    private async createFavorite(
        userId: number,
        filmDocumentId: Types.ObjectId,
        payload: CreateFavoriteInput["favorite"]
    ) {
        const addToSet = { favorites: { film: filmDocumentId, ...payload } };

        return favoriteModel.updateOne({ user: userId }, { $addToSet: addToSet }, { upsert: true });
    }

    private async updateFavorite(
        userId: number,
        filmDocumentId: Types.ObjectId,
        payload: CreateFavoriteInput["favorite"]
    ) {
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
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
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
