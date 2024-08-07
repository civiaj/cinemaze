import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ImagePreviewBody } from "@/widgets/ImagePreview/ui/ImagePreviewBody";
import { ImagePreviewSlider } from "@/widgets/ImagePreview/ui/ImagePreviewSlider";

import { TImages } from "@/entities/Film";
import { Close, Left, Right } from "@/shared/assets/icons";
import { classNames } from "@/shared/lib/classNames";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { Overlay } from "@/shared/ui/Boxes/Overlay";
import { Button } from "@/shared/ui/Button/Button";

interface ImagePreviewProps {
    onClose: () => void;
    activeIndex: number;
    images: TImages[];
}

export const ImagePreview = (props: ImagePreviewProps) => {
    const { activeIndex, images, onClose } = props;
    const [activeSlide, setActiveSlide] = useState(activeIndex);
    const [isShown, setIsShown] = useState(false);
    const onSetIsShown = useCallback(() => setIsShown(true), []);

    const { t } = useTranslation();

    const lastSlide = images.length - 1;
    const firstSlide = 0;
    const activeImageUrl = images[activeSlide].imageUrl;

    const onNextSlide = useCallback(() => {
        activeSlide < lastSlide && setActiveSlide((p) => p + 1);
        setIsShown(false);
    }, [lastSlide, activeSlide]);

    const onPreviousSlide = useCallback(
        () => activeSlide > firstSlide && setActiveSlide((p) => p - 1),
        [activeSlide]
    );
    const onSetSlide = (newSlide: number) => setActiveSlide(newSlide);

    const handleClose = useCallback(() => onClose(), [onClose]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
            if (e.key === "ArrowRight") onNextSlide();
            else if (e.key === "ArrowLeft") onPreviousSlide();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleClose, onNextSlide, onPreviousSlide]);

    return (
        <Overlay withInert hideScroll theme="modal" className="z-50">
            <div className="h-full w-full bg-neutral-950">
                <div className="flex flex-col gap-4 p-2 h-full">
                    <div className=" flex items-center gap-2 z-20 self-end">
                        <AppLink to={activeImageUrl} target="_blank" theme="sourceBig">
                            {t("details.images-source")}
                        </AppLink>
                        <Button theme="controlIcon" onClick={handleClose}>
                            <Close className="text-xl " />
                        </Button>
                    </div>
                    <div className="flex-1">
                        <div className="grid grid-cols-7 gap-x-4 h-full">
                            <Button
                                theme="controlIcon"
                                className={classNames("h-full w-full col-span-1 focus:ring-0", {
                                    ["pointer-events-none opacity-0"]: activeSlide === firstSlide,
                                })}
                                onClick={onPreviousSlide}
                            >
                                <Left />
                            </Button>
                            <ImagePreviewBody
                                src={activeImageUrl}
                                isShown={isShown}
                                onSetIsShown={onSetIsShown}
                            />
                            <Button
                                theme="controlIcon"
                                className={classNames("h-full w-full col-span-1 focus:ring-0", {
                                    ["pointer-events-none opacity-0"]: activeSlide === lastSlide,
                                })}
                                onClick={onNextSlide}
                            >
                                <Right />
                            </Button>
                        </div>
                    </div>

                    <ImagePreviewSlider
                        images={images}
                        activeSlide={activeSlide}
                        initialSlide={activeIndex}
                        onSetSlide={onSetSlide}
                    />
                </div>
            </div>
        </Overlay>
    );
};
