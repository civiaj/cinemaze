import { PageActions, TFavorite } from "@/entities/Favorite";
import { Heading } from "@/shared/ui/Text/Heading";

interface HeaderProps {
    data: {
        label?: string;
        year?: string;
        nameOriginal?: string;
        ratingAgeLimits?: string;
        filmId: number;
    };
    updateFavorite: (favorite: Partial<TFavorite>) => Promise<void>;
    disabled: boolean;
}

export const AboutHeader = ({ data, updateFavorite, disabled }: HeaderProps) => {
    const { label, nameOriginal, ratingAgeLimits, year, filmId } = data;

    return (
        <header className="flex flex-col absolute top-2 left-2 gap-2 vsm:gap-4 vsm:static z-[1]">
            <div className="flex flex-col gap-0 vsm:gap-1">
                <Heading headinglevel={1} className="text-neutral-50 vsm:text-inherit">
                    {label} ({year})
                </Heading>
                {nameOriginal && (
                    <span className="text-neutral-200 vsm:text-my-neutral-500">
                        {nameOriginal} {ratingAgeLimits && <span>{ratingAgeLimits}</span>}
                    </span>
                )}
            </div>
            <PageActions filmId={filmId} updateFavorite={updateFavorite} disabled={disabled} />
        </header>
    );
};
