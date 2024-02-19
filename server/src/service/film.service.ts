import { FilterQuery, QueryOptions, Types, UpdateQuery } from "mongoose";
import filmModel, { Film } from "../model/film.model";

class FilmService {
    async updateFilm(filmId: number, update: UpdateQuery<Film>, options: QueryOptions<Film> = {}) {
        return filmModel.findOneAndUpdate({ filmId }, update, {
            upsert: true,
            lean: true,
            new: true,
            ...options,
        });
    }

    async findOne(filmId: string) {
        return filmModel.findOne({ filmId }).lean();
    }
}

export default new FilmService();
