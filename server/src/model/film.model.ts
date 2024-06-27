import mongoose from "mongoose";

export type Film = {
    id: number;
    nameRu: string | null;
    nameEn: string | null;
    nameOriginal: string | null;
    year: number | null;
    filmLengthMins: number;
    filmLengthHours: string | null;
    countries: { country: string }[] | null;
    genres: { genre: string }[] | null;
    rating: number | null;
    posterUrlPreview: string;
};

const filmSchema = new mongoose.Schema<Film>(
    {
        countries: { type: [{ country: String }] },
        genres: { type: [{ genre: String }] },
        id: { type: Number, required: true, unique: true },
        nameEn: String,
        nameRu: String,
        nameOriginal: String,
        filmLengthMins: Number,
        filmLengthHours: String,
        posterUrlPreview: String,
        rating: Number,
        year: Number,
    },
    { versionKey: false }
);

const filmModel = mongoose.model("Film", filmSchema);
export default filmModel;
