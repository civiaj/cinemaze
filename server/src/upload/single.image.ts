import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import sharp from "sharp";
import ApiError from "../exceptions/api.error";
import * as uuid from "uuid";

const storage = multer.memoryStorage();

const fileFilter = (_req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
    if (!file.mimetype.includes("image")) {
        return callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
    }
    callback(null, true);
};

const limits = {
    fileSize: 1024 * 1024 * 5, // 5.12 mb
    files: 1,
};

export const uploadSingleImage = multer({ storage, fileFilter, limits }).single("image");

export const resizeSingleImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = req.file;
        if (!file) throw ApiError.BadRequest();

        const fileName = `profile_${uuid.v4()}_${res.locals.user.id}.jpeg`;
        await sharp(req.file?.buffer)
            .resize(250, 250)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`${__dirname}/../../static/profiles/${fileName}`);
        req.body.photo = fileName;
        next();
    } catch (e) {
        next(e);
    }
};
