import { SwiperOptions } from "swiper/types";
import { FilmImagesT } from "@/entities/FilmDetails";
import { classNames } from "@/shared/lib/classNames";
import { AppImage } from "@/shared/ui/AppImage/AppImage";
import { Slider } from "@/shared/ui/Slider";

const sliderSettings: SwiperOptions = {
    centeredSlides: true,
    slideToClickedSlide: true,
    breakpoints: {
        1280: {
            slidesPerView: 8,
        },
        1024: {
            slidesPerView: 6,
        },
        768: {
            slidesPerView: 4,
        },
        450: {
            slidesPerView: 3,
        },
        300: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1,
        },
    },
};

interface ImagePreviewSliderProps {
    initialSlide: number;
    activeSlide: number;
    images: FilmImagesT[];
    onSetSlide: (newSlide: number) => void;
    className?: string;
}

export const ImagePreviewSlider = (props: ImagePreviewSliderProps) => {
    const { activeSlide, images, initialSlide, onSetSlide, className } = props;

    return (
        <Slider
            className={className}
            render={(image, index) => (
                <button
                    className={classNames(
                        "w-full h-32 opacity-50 transition-opacity rounded-xl overflow-hidden border-2 border-transparent",
                        {
                            ["opacity-100 border-neutral-50"]: activeSlide === index,
                        }
                    )}
                    onClick={() => onSetSlide(index!)}
                >
                    <AppImage src={image.previewUrl} containerClassName="bg-black" />
                </button>
            )}
            slides={images}
            activeSlide={activeSlide}
            initialSlide={initialSlide}
            {...sliderSettings}
        />
    );
};
