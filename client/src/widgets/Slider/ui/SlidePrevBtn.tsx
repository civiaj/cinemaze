import { useSwiper } from "swiper/react";
import { Left } from "@/shared/assets/icons";
import { classNames } from "@/shared/lib/classNames";
import { Button } from "@/shared/ui/Button/Button";


interface SlidePrevBtnProps {
    forceUpdate: () => void;
}

export const SlidePrevBtn = ({ forceUpdate }: SlidePrevBtnProps) => {
    const swiper = useSwiper();
    const isBeginning = swiper.isBeginning;

    const handleNext = () => {
        swiper.slidePrev();
        forceUpdate();
    };

    return (
        <Button
            onClick={handleNext}
            theme="regular"
            className={classNames(
                "absolute top-1/2 left-1 -translate-y-1/2 h-10 w-10 z-10 p-0 justify-center rounded-full active:-translate-y-1/2",
                {
                    ["opacity-0 pointer-events-none"]: isBeginning,
                }
            )}
        >
            <Left className="text-xl" />
        </Button>
    );
};
