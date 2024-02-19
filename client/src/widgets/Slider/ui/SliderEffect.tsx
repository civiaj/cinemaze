import { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";

interface SliderEffectProps {
    activeSlide: number;
    forceUpdate: () => void;
}

export const SliderEffect = ({ activeSlide, forceUpdate }: SliderEffectProps) => {
    const swiper = useSwiper();
    const [isInitial, setInitial] = useState(true);

    useEffect(() => {
        if (!isInitial) {
            swiper.slideTo(activeSlide);
            forceUpdate();
        } else setInitial(false);
    }, [activeSlide, isInitial, swiper, forceUpdate]);

    return <></>;
};
