import { ReactEventHandler, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames";
import { AppImage } from "@/shared/ui/AppImage/AppImage";
import { AppLink } from "@/shared/ui/AppLink/AppLink";

interface FilmImageProps {
    index: number;
    previewUrl: string;
    imageUrl: string;
    handlePreviewOpen: (index: number) => void;
}

const bigImages = [0, 2];
const mediumImages = [1, 4, 5, 7, 8, 9];
const smallImages = [3, 6];

export const FilmImage = memo((props: FilmImageProps) => {
    const { index, previewUrl, imageUrl, handlePreviewOpen } = props;

    const { t } = useTranslation();

    const [dimension, setDimension] = useState<"vertical" | "horizontal" | null>(null);

    const big = bigImages.includes(index % 10);
    const medium = mediumImages.includes(index % 10);
    const small = smallImages.includes(index % 10);

    const horizontalBig = dimension === "horizontal" && big;
    const horizontalMedium = dimension === "horizontal" && medium;
    const horizontaSmall = dimension === "horizontal" && small;
    const verticalBig = dimension === "vertical" && big;
    const verticalMedium = dimension === "vertical" && medium;
    const verticalSmall = dimension === "vertical" && small;

    const handleLoad: ReactEventHandler<HTMLImageElement> = (e) => {
        const height = e.currentTarget.naturalHeight;
        const width = e.currentTarget.naturalWidth;
        setDimension(height > width ? "vertical" : "horizontal");
    };

    return (
        <>
            {!dimension && (
                <li
                    className={classNames("opacity-0 hidden rounded-xl bg-my-neutral-100", {
                        ["row-span-2 col-span-2 md:row-span-3 opacity-100 block"]: big,
                        ["row-span-2 md:row-span-2 opacity-100 block"]: medium,
                        ["row-span-2 md:row-span-3 opacity-100 block"]: small,
                    })}
                ></li>
            )}
            <li
                className={classNames(
                    `${
                        !dimension
                            ? "opacity-0 pointer-events-none w-0 h-0 absolute"
                            : "opacity-100 pointer-events-auto w-full h-full block"
                    }`,
                    {
                        ["row-span-6 md:row-span-6"]: verticalBig,
                        ["row-span-4 md:row-span-4"]: verticalMedium,
                        ["row-span-4 md:row-span-3"]: verticalSmall,

                        ["row-span-2 col-span-2 md:row-span-3"]: horizontalBig,
                        ["row-span-2 md:row-span-2"]: horizontalMedium,
                        ["row-span-2 md:row-span-3"]: horizontaSmall,
                    }
                )}
            >
                <button
                    className="group h-full w-full relative rounded-xl overflow-hidden focus:ring-2 focus:ring-blue-500 outline-none"
                    onClick={() => handlePreviewOpen(index)}
                >
                    <AppImage src={previewUrl} alt={`preview #${index}`} onLoad={handleLoad} />
                    <span className="absolute top-2 left-2 z-[1] ">
                        <AppLink
                            to={imageUrl}
                            target="_blank"
                            theme="sourceSmall"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {t("details.images-source")}
                        </AppLink>
                    </span>
                    <div className="absolute inset-0 pointer-events-none select-none bg-neutral-900 opacity-0 group-hover:opacity-50 group-focus:opacity-50" />
                </button>
            </li>
        </>
    );
});
