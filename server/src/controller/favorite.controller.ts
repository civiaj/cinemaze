import { NextFunction, Response, Request } from "express";
import {
    CreateFavoriteInput,
    GetFavoriteAllInput,
    RemoveFavoriteOneInput,
} from "../schema/favorite.schema";
import favoriteService from "../service/favorite.service";
import filmService from "../service/film.service";
import { CreateFilmInput } from "../schema/film.schema";
import ApiError from "../exceptions/api.error";

class FavoriteController {
    async addFavorite(
        req: Request<object, object, CreateFilmInput & CreateFavoriteInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { favorite, ...payload } = req.body;
            const film = await filmService.updateFilm(payload.id, payload);

            if (!film) throw ApiError.BadRequest("Ошибка при обновлении фильма");
            const userId = res.locals.user.id;

            await favoriteService.updateOne({
                filmDocumentId: film._id,
                filmId: film.id,
                payload: favorite,
                userId,
            });
            return res.status(200).json({ message: "Фильм изменен" });
        } catch (e) {
            next(e);
        }
    }
    async getAllFavorite(
        req: Request<object, object, object, GetFavoriteAllInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data = await favoriteService.getAll(
                res.locals.user.id,
                Number(req.query.page),
                req.query.filter
            );
            return res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    }
    async removeFavorite(
        req: Request<object, object, RemoveFavoriteOneInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id, field } = req.body;
            const film = await filmService.findOne(String(id));
            if (!film) throw ApiError.BadRequest("Ошибка при обновлении фильма");

            await favoriteService.removeField({
                field,
                userId: res.locals.user.id,
                filmDocumentId: film._id,
            });

            return res.status(200).json({ message: "success" });
        } catch (e) {
            next(e);
        }
    }
    async getStatistics(_req: Request, res: Response, next: NextFunction) {
        try {
            const data = await favoriteService.getStats(res.locals.user.id);
            return res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    }
    async getStatisticsTotal(_req: Request, res: Response, next: NextFunction) {
        try {
            const data = await favoriteService.getStatsTotal(res.locals.user.id);
            return res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export default new FavoriteController();
