import { ReactNode, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { ID_VIEW_SWITCHER } from "@/shared/const/const";
import { classNames } from "@/shared/lib/classNames";
import { Box } from "@/shared/ui/Boxes/Box";
import { UserBoxSeparator } from "@/shared/ui/Boxes/UserBox";
import { Button } from "@/shared/ui/Button/Button";
import { Heading } from "@/shared/ui/Text/Heading";
import { Description } from "@/widgets/Details";
import { FilmAwards } from "@/widgets/FilmAwards";
import { FilmImages } from "@/widgets/FilmImages";
import { ViewSwitcherTypes } from "../model/types";



interface ViewSwitcherProps {
    filmId: number;
}

const categories: { title: string; value: ViewSwitcherTypes }[] = [
    { title: "details.descr", value: "description" },
    { title: "details.images", value: "images" },
    { title: "details.awards", value: "awards" },
];

export const ViewSwitcher = (props: ViewSwitcherProps) => {
    const { filmId } = props;
    const listRef = useRef<HTMLUListElement>(null);
    const markerRef = useRef<HTMLDivElement>(null);
    const itemRef = useRef<Map<string, HTMLLIElement> | null>(null);

    const { t } = useTranslation();

    const getMap = () => {
        if (!itemRef.current) itemRef.current = new Map<string, HTMLLIElement>();
        return itemRef.current;
    };

    const scrollToItem = useCallback((view: ViewSwitcherTypes) => {
        const map = getMap();
        const node = map.get(view);

        if (node && markerRef.current) {
            markerRef.current.style.left = `${node.offsetLeft}px`;
            markerRef.current.style.width = `${node.offsetWidth}px`;
        }
    }, []);

    const [searchParams, setSearchParams] = useSearchParams();

    const nowIsShown = (
        categories.find((cat) => cat.value === searchParams.get("view"))
            ? searchParams.get("view")
            : "description"
    ) as ViewSwitcherTypes;

    const renderedView: { [key in ViewSwitcherTypes]: ReactNode } = {
        description: <Description filmId={filmId} />,
        images: <FilmImages filmId={filmId} />,
        awards: <FilmAwards filmId={filmId} />,
    };

    const handleChangeCategory = (category: ViewSwitcherTypes) => {
        searchParams.set("view", category);
        setSearchParams(searchParams);
        scrollToItem(category);
    };

    useEffect(() => {
        if (!listRef.current) return;
        const resizeObserver = new ResizeObserver(() => {
            scrollToItem(nowIsShown);
        });
        resizeObserver.observe(listRef.current);
        return () => resizeObserver.disconnect();
    }, [scrollToItem, nowIsShown]);

    const component = renderedView[nowIsShown] || renderedView.description;

    return (
        <Box id={ID_VIEW_SWITCHER} className="onPageNavigation overflow-hidden">
            <ul className="flex gap-2 relative self-start" ref={listRef}>
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
                                ["text-my-neutral-800 border-b-transparent hover:border-b-transparent focus:border-b-transparent botft"]:
                                    nowIsShown === category.value,
                            })}
                            theme="category"
                            onClick={() => handleChangeCategory(category.value)}
                        >
                            <Heading headinglevel={3}>{t(category.title)}</Heading>
                        </Button>
                    </li>
                ))}
                <div
                    ref={markerRef}
                    className="absolute h-[2px] w-0 bg-blue-500 bottom-0 transition-all"
                />
            </ul>
            <UserBoxSeparator />
            {component}
        </Box>
    );
};
