import { TAppearances } from "@/entities/Ui";

export type FilmCardPropsT = {
    film: FilmT;
    userScore?: number | null;
    isHidden?: boolean;
    label?: string;
    onDelete?: (id: number) => void;
    onClick?: () => void;
    hideStats?: boolean;
    appearance: TAppearances;
    cardStyles?: TCardStyles;
};
