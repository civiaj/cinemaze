import { TAppearances } from "@/entities/Ui";
import { SKELETON_FILMS_LENGTH } from "@/shared/const/const";
import { FilmCardSkeleton } from "@/shared/ui/FilmCard";

type Props = {
    containerStyle: string;
    appearance: TAppearances;
    cardStyles?: TCardStyles;
};

export const FilmListSkeleton = ({ containerStyle, appearance, cardStyles }: Props) => {
    return (
        <ul className={containerStyle}>
            {Array.from({ length: SKELETON_FILMS_LENGTH[appearance] }, (_, i) => i).map((v) => (
                <FilmCardSkeleton appearance={appearance} key={v} cardStyles={cardStyles} />
            ))}
        </ul>
    );
};
