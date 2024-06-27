import { TFilm } from "@/entities/Film";
import { TAppearances } from "@/entities/Ui";

export type FilmCardPropsT = {
    film: TFilm;
    userScore?: number | null;
    isHidden?: boolean | null;
    label?: string;
    onDelete?: (id: number) => void;
    onClick?: () => void;
    hideStats?: boolean;
    appearance: TAppearances;
    cardStyles?: TCardStyles;
};
