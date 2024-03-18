import { GetFilmImagesType } from "../model/types";
import { tags } from "../model/data";
import { Text } from "shared/ui/Text/Text";

interface FilmImagesEmptyProps {
    type: GetFilmImagesType;
}

export const FilmImagesEmpty = ({ type }: FilmImagesEmptyProps) => {
    const tagName = tags.find((tag) => tag.type === type)?.title || "";
    return (
        <Text as="p" className="text-center">
            В категории <span className="text-blue-500">{tagName}</span> изображений не найдено
        </Text>
    );
};
