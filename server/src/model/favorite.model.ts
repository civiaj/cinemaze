import mongoose from "mongoose";
import { FavoriteEntity } from "../types/types";

export type FavoriteItem = {
    film: mongoose.Schema.Types.ObjectId;
    filmId: number;
    createdAt: Date;
    updateAt: Date;
} & FavoriteEntity;

export type Favorite = {
    user: mongoose.Schema.Types.ObjectId;
    favorites: FavoriteItem[];
};

const favoriteSchema = new mongoose.Schema<Favorite>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        favorites: {
            type: [
                new mongoose.Schema(
                    {
                        film: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Film",
                            required: true,
                        },
                        filmId: { type: Number, required: true },
                        userScore: { type: Number, default: null },
                        bookmarked: { type: Boolean, default: null },
                        hidden: { type: Boolean, default: null },
                    },
                    { timestamps: true }
                ),
            ],

            default: undefined,
            sparse: true,
        },
    },
    { versionKey: false }
);

const favoriteModel = mongoose.model("Favorite", favoriteSchema);
export default favoriteModel;
