import { ReactNode, useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import "swiper/css";
import { SliderEffect } from "./SliderEffect";
import { SlideNextBtn } from "./SlideNextBtn";
import { SlidePrevBtn } from "./SlidePrevBtn";

interface SliderProps<T> extends SwiperOptions {
    className?: string;
    activeSlide?: number;
    render: (item: T, index?: number) => ReactNode;
    slides: T[];
}

const settings: SwiperOptions = {
    spaceBetween: 8,
    breakpointsBase: "window",
    speed: 300,
    updateOnWindowResize: true,
    resizeObserver: true,
};

export const Slider = <T,>(props: SliderProps<T>) => {
    const { render, slides, className, activeSlide, ...otherProps } = props;
    const [, setCounter] = useState(0);

    const forceUpdate = useCallback(() => setCounter((p) => p + 1), []);

    return (
        <div className={classNames("relative", {}, [className])}>
            <Swiper
                {...settings}
                {...otherProps}
                onSlideChange={forceUpdate}
                className="select-none"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>{render(slide, index)}</SwiperSlide>
                ))}
                <SlideNextBtn forceUpdate={forceUpdate} />
                <SlidePrevBtn forceUpdate={forceUpdate} />
                {activeSlide !== undefined && (
                    <SliderEffect forceUpdate={forceUpdate} activeSlide={activeSlide} />
                )}
            </Swiper>
        </div>
    );
};
