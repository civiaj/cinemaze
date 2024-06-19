import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { SearchInput } from "@/pages/SearchPage";
import { allowNavbarScroll, uiActions } from "@/entities/Ui";
import { Menu } from "@/shared/assets/icons";
import { classNames } from "@/shared/lib/classNames";
import { Button } from "@/shared/ui/Button/Button";
import { NavbarAuthPopup } from "./NavbarAuthPopup/NavbarAuthPopup";

const min = 0;

export const Navbar = () => {
    const dispatch = useAppDispatch();
    const handleToggle = () => dispatch(uiActions.toggleSidebar());
    const navRef = useRef<HTMLElement>(null);
    const { pathname } = useLocation();

    const allowScroll = useAppSelector(allowNavbarScroll);
    const [wasClicked, setWasClicked] = useState(false);

    const [isActive, setActive] = useState(false);
    const onOpenSearch = useCallback((newValue: boolean) => {
        setActive(newValue);
    }, []);

    useEffect(() => {
        if (!navRef.current || !allowScroll || isActive) return;
        const max = navRef.current.scrollHeight;

        let translate = 0;
        let prev = window.scrollY;

        const handleScroll = () => {
            if (wasClicked) return setWasClicked(false);

            const scrollY = window.scrollY;

            if (prev < scrollY) {
                translate = translate < max ? translate + (scrollY - prev) : max;
            } else {
                translate = translate > min ? translate - (prev - scrollY) : min;
            }

            if (translate > max) translate = max;
            if (translate < min) translate = min;
            if (scrollY <= 0) translate = 0;

            navRef.current!.style.transform = `translateY(-${translate}px)`;
            prev = scrollY;
        };

        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
    }, [allowScroll, wasClicked, isActive]);

    useEffect(() => {
        if (wasClicked) {
            navRef.current!.style.transform = `translateY(${min}px)`;
        }
    }, [wasClicked]);

    if (pathname.includes(routePath.login)) return null;

    return (
        <nav
            ref={navRef}
            className={classNames(
                "w-full items-center h-14 justify-between gap-2 z-50 flex bg-my-sky-200 sticky top-0 left-0 backdrop-blur-sm shrink-0 px-2",
                { ["transition-transform"]: wasClicked }
            )}
            onMouseDown={() => setWasClicked(true)}
        >
            <Button theme="regularNavIcon" onClick={handleToggle} className="hidden sm:flex">
                <Menu />
            </Button>

            <SearchInput isActive={isActive} setActive={onOpenSearch} />
            <div className="flex gap-4 items-center">
                <NavbarAuthPopup />
            </div>
        </nav>
    );
};
