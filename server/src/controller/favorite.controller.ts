import { NextFunction, Response, Request } from "express";
import {
    CreateFavoriteInput,
    GetFavoriteAllInput,
    GetFavoriteOneInput,
    RemoveFavoriteOneInput,
} from "../schema/favorite.schema";
import favoriteService from "../service/favorite.service";
import filmService from "../service/film.service";
import { CreateFilmInput } from "../schema/film.schema";
import ApiError from "../exceptions/api.error";

class FavoriteController {
    async addFavorite(
        req: Request<{}, {}, CreateFilmInput & CreateFavoriteInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const film = await filmService.updateFilm(req.body.film.filmId, req.body.film);

            if (!film) throw ApiError.BadRequest("Ошибка при обновлении фильма");

            await favoriteService.modifyFavorite(res.locals.user.id, film._id, req.body.favorite);

            return res.status(200).json({ message: "Добавлено в избранное" });
        } catch (e) {
            next(e);
        }
    }

    async getOneFavorite(req: Request<GetFavoriteOneInput>, res: Response, next: NextFunction) {
        try {
            const film = await filmService.findOne(req.params.filmId);

            if (!film)
                return res.send({ data: { bookmarked: false, hidden: false, userScore: null } });

            const data = await favoriteService.getFavoriteData(res.locals.user.id, film._id);

            return res.status(200).json({ data });
        } catch (e) {
            next(e);
        }
    }

    async getAllFavorite(
        req: Request<{}, {}, {}, GetFavoriteAllInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data = await favoriteService.getFavoriteAll(
                res.locals.user.id,
                Number(req.query.page),
                req.query.filter
            );
            return res.status(200).json({ data });
        } catch (e) {
            next(e);
        }
    }

    async removeFavorite(
        req: Request<{}, {}, RemoveFavoriteOneInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { filmId, ...favorite } = req.body;

            const film = await filmService.findOne(String(filmId));
            if (!film) throw ApiError.BadRequest("Ошибка при обновлении фильма");

            const updated = await favoriteService.removeFavoriteField(
                res.locals.user.id,
                film._id,
                favorite
            );

            return res.status(200).json({ data: updated });
        } catch (e) {
            next(e);
        }
    }

    async syncApis(_req: Request<GetFavoriteOneInput>, res: Response, next: NextFunction) {
        try {
            const data = await favoriteService.getFavoriteSyncData(res.locals.user.id);
            return res.status(200).json({ data });
        } catch (e) {
            next(e);
        }
    }
    async getStatistics(_req: Request, res: Response, next: NextFunction) {
        try {
            const data = await favoriteService.getFavoriteStatistics(res.locals.user.id);
            return res.status(200).json({ data });
        } catch (e) {
            next(e);
        }
    }
}

export default new FavoriteController();
