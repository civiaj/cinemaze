import mongoose from "mongoose";

export type Film = {
    filmId: number;
    nameRu?: string;
    nameEn?: string;
    nameOriginal?: string;
    year: string;
    filmLength?: string;
    countries: { country: string }[];
    genres: { genre: string }[];
    rating?: string;
    posterUrlPreview: string;
};

const filmSchema = new mongoose.Schema<Film>(
    {
        countries: { type: [{ country: String }] },
        genres: { type: [{ genre: String }] },
        filmId: { type: Number, required: true, unique: true },
        nameEn: String,
        nameRu: String,
        nameOriginal: String,
        filmLength: String,
        posterUrlPreview: String,
        rating: String,
        year: String,
    },
    { versionKey: false }
);

const filmModel = mongoose.model("Film", filmSchema);
export default filmModel;
