import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { FilmImages } from "widgets/FilmImages";
import { FilmAwards } from "widgets/FilmAwards";
import { Description } from "widgets/Details";
import { classNames } from "shared/lib/classNames";
import { Button } from "shared/ui/Button/Button";
import { Heading } from "shared/ui/Text/Heading";
import { Box } from "shared/ui/Boxes/Box";
import { useInitialEffect } from "shared/hooks/useInitialEffect";
import { ID_VIEW_SWITCHER } from "shared/const/const";

import { ViewSwitcherTypes } from "../model/types";

interface ViewSwitcherProps {
    filmId: number;
}

const categories: { title: string; value: ViewSwitcherTypes }[] = [
    { title: "Обзор", value: "description" },
    { title: "Изображения", value: "images" },
    { title: "Награды", value: "awards" },
];

export const ViewSwitcher = (props: ViewSwitcherProps) => {
    const { filmId } = props;
    const markerRef = useRef<HTMLDivElement>(null);
    const itemRef = useRef<Map<string, HTMLLIElement> | null>(null);

    const getMap = () => {
        if (!itemRef.current) itemRef.current = new Map<string, HTMLLIElement>();
        return itemRef.current;
    };

    const scrollToItem = useCallback((itemId: string) => {
        const map = getMap();
        const node = map.get(itemId);

        if (node && markerRef.current) {
            markerRef.current.style.left = `${node.offsetLeft}px`;
            markerRef.current.style.width = `${node.offsetWidth}px`;
        }
    }, []);

    const [nowIsShown, setNowIsShown] = useState<ViewSwitcherTypes>("description");

    const renderedView: { [key in ViewSwitcherTypes]: ReactNode } = {
        description: <Description filmId={filmId} />,
        images: <FilmImages filmId={filmId} />,
        awards: <FilmAwards filmId={filmId} />,
    };

    const handleChangeCategory = (category: ViewSwitcherTypes) => {
        setNowIsShown(category);
        scrollToItem(category);
    };

    useInitialEffect(() => scrollToItem(nowIsShown));

    useEffect(() => {
        const updateMarker = () => scrollToItem(nowIsShown);
        window.addEventListener("resize", updateMarker);
        return () => window.removeEventListener("resize", updateMarker);
    }, [scrollToItem, nowIsShown]);

    return (
        <Box id={ID_VIEW_SWITCHER} className="onPageNavigation">
            <ul className="flex gap-2 relative">
                {categories.map((category) => (
                    <li
                        key={category.value}
                        ref={(node) => {
                            const map = getMap();
                            if (node) {
                                map.set(category.value, node);
                            } else {
                                map.delete(category.value);
                            }
                        }}
                    >
                        <Button
                            className={classNames("", {
                                ["text-my-neutral-800 border-b-transparent hover:border-b-transparent focus:border-b-transparent"]:
                                    nowIsShown === category.value,
                            })}
                            theme="category"
                            onClick={() => handleChangeCategory(category.value)}
                        >
                            <Heading headinglevel={3}>{category.title}</Heading>
                        </Button>
                    </li>
                ))}
                <div
                    ref={markerRef}
                    className="absolute h-[2px] w-0 bg-blue-500 bottom-0 transition-all"
                />
            </ul>

            {renderedView[nowIsShown]}
        </Box>
    );
};
