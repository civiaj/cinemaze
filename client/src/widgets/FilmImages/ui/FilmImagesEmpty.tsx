import { GetFilmImagesType } from "../model/types";
import { tags } from "../model/data";

interface FilmImagesEmptyProps {
    type: GetFilmImagesType;
}

export const FilmImagesEmpty = ({ type }: FilmImagesEmptyProps) => {
    const tagName = tags.find((tag) => tag.type === type)?.title || "";
    return (
        <p className="text-center font-medium">
            В категории <span className="text-blue-500">{tagName}</span> изображений не найдено.
        </p>
    );
};
