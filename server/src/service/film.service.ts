import { QueryOptions, UpdateQuery } from "mongoose";
import filmModel, { Film } from "../model/film.model";

class FilmService {
    async updateFilm(id: number, update: UpdateQuery<Film>, options: QueryOptions<Film> = {}) {
        return filmModel.findOneAndUpdate({ id }, update, {
            upsert: true,
            lean: true,
            new: true,
            ...options,
        });
    }

    async findOne(id: string) {
        return filmModel.findOne({ id }).lean();
    }
}

export default new FilmService();
