import { AnimatedComponent, animated, easings, useTransition } from "@react-spring/web";
import { CSSProperties, FC, useCallback, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { getIsMobile, getSidebarIsOpen, uiActions } from "@/entities/Ui";
import { Overlay } from "@/shared/ui/Boxes/Overlay";
import { getSidebarItems } from "../model/selectors";
import { SidebarItem } from "./SidebarItem";

type AnimatedOverlayProps = {
    style: CSSProperties;
    onClick: () => void;
    className: string;
};

export const Sidebar = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(getSidebarIsOpen);
    const { pathname } = useLocation();
    const sidebarItems = useAppSelector(getSidebarItems);
    const isMobile = useAppSelector(getIsMobile);

    const handleClose = useCallback(() => dispatch(uiActions.closeSidebar()), [dispatch]);

    const transitions = useTransition(isOpen, {
        from: {
            opacity: 0,
            transform: "translateX(-100%)",
        },
        enter: {
            opacity: 1,
            transform: "translateX(0%)",
        },
        leave: { opacity: 0, transform: "translateX(-100%)" },
        config: {
            duration: 200,
            easing: easings.easeInOutCubic,
        },
    });

    const AnimatedOverlay: AnimatedComponent<FC<AnimatedOverlayProps>> = useMemo(
        () => animated((props) => <Overlay {...props} />),
        []
    );

    useEffect(() => {
        if (isMobile) handleClose();
    }, [isMobile, handleClose]);

    if (pathname.includes(routePath.login)) return null;

    return transitions(
        (style, item) =>
            item && (
                <>
                    <animated.aside
                        style={{ ...style }}
                        className="bg-my-white shadow-sm shadow-my-neutral-200 z-30 py-2 hidden sm:flex flex-col justify-between fixed top-0 left-0 h-[100dvh] mt-14 overflow-y-scroll"
                    >
                        <ul className="p-2 hidden flex-col gap-1 w-64 3xl:flex">
                            {sidebarItems.map((sidebarItem) => (
                                <SidebarItem {...sidebarItem} key={sidebarItem.label} />
                            ))}
                        </ul>

                        <ul className="p-2 flex flex-col gap-1 w-64 3xl:hidden">
                            {sidebarItems.map((sidebarItem) => (
                                <SidebarItem
                                    key={sidebarItem.label}
                                    {...sidebarItem}
                                    onClick={handleClose}
                                />
                            ))}
                        </ul>
                    </animated.aside>

                    <AnimatedOverlay
                        onClick={handleClose}
                        style={{ ...style, transform: "translateX(0)" }}
                        className="hidden sm:block 3xl:hidden"
                    />
                </>
            )
    );
};
