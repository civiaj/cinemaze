import { tags } from "../model/data";
import { GetFilmImagesType } from "../model/types";
import { Button } from "shared/ui/Button/Button";

interface FilmImagesHeaderProps {
    setNewType: (newType: GetFilmImagesType) => void;
    value: GetFilmImagesType;
}

export const FilmImagesHeader = (props: FilmImagesHeaderProps) => {
    const { setNewType, value } = props;

    return (
        <ul className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
                <li key={tag.type}>
                    <Button
                        theme="regularTag"
                        active={value === tag.type}
                        onClick={() => setNewType(tag.type)}
                    >
                        {tag.title}
                    </Button>
                </li>
            ))}
        </ul>
    );
};
