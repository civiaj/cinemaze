import { useSwiper } from "swiper/react";
import { Right } from "@/shared/assets/icons";
import { classNames } from "@/shared/lib/classNames";
import { Button } from "@/shared/ui/Button/Button";


interface SlideNextBtnProps {
    forceUpdate: () => void;
}

export const SlideNextBtn = ({ forceUpdate }: SlideNextBtnProps) => {
    const swiper = useSwiper();
    const isEnd = swiper.isEnd;

    const handleNext = () => {
        swiper.slideNext();
        forceUpdate();
    };

    return (
        <Button
            onClick={handleNext}
            theme="regular"
            className={classNames(
                "absolute top-1/2 right-1 -translate-y-1/2 z-10 h-10 w-10 p-0 justify-center rounded-full active:-translate-y-1/2",
                {
                    ["opacity-0 pointer-events-none"]: isEnd,
                }
            )}
        >
            <Right className="text-xl" />
        </Button>
    );
};
