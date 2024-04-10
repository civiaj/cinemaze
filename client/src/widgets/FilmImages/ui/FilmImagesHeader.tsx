import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/Button/Button";
import { tags } from "../model/data";
import { GetFilmImagesType } from "../model/types";

interface FilmImagesHeaderProps {
    setNewType: (newType: GetFilmImagesType) => void;
    value: GetFilmImagesType;
}

export const FilmImagesHeader = (props: FilmImagesHeaderProps) => {
    const { setNewType, value } = props;
    const { t } = useTranslation();

    return (
        <ul className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
                <li key={tag.type}>
                    <Button
                        theme="regularTag"
                        active={value === tag.type}
                        onClick={() => setNewType(tag.type)}
                    >
                        {t(tag.title)}
                    </Button>
                </li>
            ))}
        </ul>
    );
};
