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
            theme="blue"
            className={classNames(
                "fixed z-20 right-2 bottom-7 opacity-0 pointer-events-none hidden h-10 w-10 p-0 text-2xl",
                {
                    ["pointer-events-auto opacity-100 flex"]: isDisplayed,
                }
            )}
        >
            {isOnTop ? <Down /> : <Up />}
        </Button>
    );
};
