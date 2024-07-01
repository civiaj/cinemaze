import { NextFunction, Response, Request } from "express";
import {
    GetImagesInput,
    GetReviewsInput,
    GetSearchResultsInput,
    GetTopInput,
    getExternalDataByIdInput,
} from "../schema/external-films.schema";
import externalFilmsService from "../service/external-films.service";
import favoriteService from "../service/favorite.service";

class ExternalFilmsController {
    async getTop(
        req: Request<object, object, object, GetTopInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data = await externalFilmsService.top(req.query);
            const { id } = res.locals?.user ?? {};
            if (id) {
                const ids = data.films.map((film) => film.id);
                const favorites = await favoriteService.hydrateByIds(id, ids);
                data.films = data.films.map((film) => {
                    const { id } = film;
                    const candidate = favorites.find(({ filmId }) => filmId === id);
                    if (!candidate) return film;
                    const { filmId, ...favorite } = candidate;
                    return { ...film, favorite };
                });
            }
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
    async getDetails(req: Request<getExternalDataByIdInput>, res: Response, next: NextFunction) {
        try {
            const data = await externalFilmsService.details(req.params);
            const { id } = res.locals?.user ?? {};
            if (id) {
                const favorite = await favoriteService.hydrateOne(id, req.params.id);
                if (favorite) data.favorite = favorite;
            }
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
    async getImages(
        req: Request<object, object, object, GetImagesInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data = await externalFilmsService.images(req.query);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
    async getReviews(
        req: Request<object, object, object, GetReviewsInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data = await externalFilmsService.reviews(req.query);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
    async getSimilars(req: Request<getExternalDataByIdInput>, res: Response, next: NextFunction) {
        try {
            const data = await externalFilmsService.similars(req.params);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async getAwards(req: Request<getExternalDataByIdInput>, res: Response, next: NextFunction) {
        try {
            const data = await externalFilmsService.awards(req.params);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
    async getFilters(req: Request<getExternalDataByIdInput>, res: Response, next: NextFunction) {
        try {
            const data = await externalFilmsService.filters();
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
    async getSearchResults(
        req: Request<object, object, object, GetSearchResultsInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data = await externalFilmsService.search(req.query);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

export default new ExternalFilmsController();
