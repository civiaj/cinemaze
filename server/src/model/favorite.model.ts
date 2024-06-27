import mongoose from "mongoose";

export type FavoriteItem = {
    film: mongoose.Schema.Types.ObjectId;
    userScore: number | null;
    bookmarked: boolean;
    hidden: boolean;
    createdAt: Date;
    updateAt: Date;
};

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
                        userScore: { type: Number, default: null },
                        bookmarked: { type: Boolean, default: false },
                        hidden: { type: Boolean, default: false },
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
