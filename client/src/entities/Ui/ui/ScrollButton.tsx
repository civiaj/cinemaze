import { useEffect, useState } from "react";
import { Down, Up } from "shared/assets/icons";
import { classNames } from "shared/lib/classNames";
import { Button } from "shared/ui/Button/Button";

interface ScrollButtonProps {
    scrollRestoration: number;
    scrollTop: () => void;
    scrollBottom: () => void;
}

export const ScrollButton = (props: ScrollButtonProps) => {
    const { scrollRestoration, scrollTop, scrollBottom } = props;
    const [isOnTop, setIsOnTop] = useState(false);

    const handleClick = () => {
        if (!isOnTop) {
            scrollTop();
            setIsOnTop(true);
        } else {
            scrollBottom();
            setIsOnTop(false);
        }
    };

    const scrollCondition = scrollRestoration > window.screen.height * 2;
    const isDisplayed = scrollCondition || isOnTop;

    useEffect(() => {
        if (scrollCondition) setIsOnTop(false);
    }, [scrollCondition]);

    return (
        <Button
            onClick={handleClick}
            theme="regularIcon"
            className={classNames(
                "fixed z-20 right-2 bottom-7 opacity-0 pointer-events-none bg-my-neutral-800 text-my-neutral-50 shadow-none hover:bg-my-neutral-900 hover:text-my-neutral-50 focus:bg-my-neutral-900",
                {
                    ["pointer-events-auto opacity-100"]: isDisplayed,
                }
            )}
        >
            {isOnTop ? <Down /> : <Up />}
        </Button>
    );
};
