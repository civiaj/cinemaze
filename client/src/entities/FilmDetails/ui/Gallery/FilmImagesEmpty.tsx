import { Trans, useTranslation } from "react-i18next";
import { Text } from "@/shared/ui/Text/Text";
import { tags } from "../../model/data";
import { GetFilmImagesType } from "../../model/types";

interface FilmImagesEmptyProps {
    type: GetFilmImagesType;
}

export const FilmImagesEmpty = ({ type }: FilmImagesEmptyProps) => {
    const tagName = tags.find((tag) => tag.type === type)?.title || "";
    const { t } = useTranslation();

    return (
        <Text as="p" className="text-center">
            <Trans
                t={t}
                i18nKey="details.images-not-found"
                values={{ tag: t(tagName) }}
                components={{ span: <span className="text-blue-500"></span> }}
            />
        </Text>
    );
};
