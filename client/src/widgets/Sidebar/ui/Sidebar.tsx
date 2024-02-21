import { AnimatedComponent, animated, useTransition } from "@react-spring/web";
import { routeConfig } from "app/router/router";
import { useAppDispatch, useAppSelector } from "app/store";
import { getSidebarCollapsed, uiActions } from "entities/Ui";
import { CSSProperties, FC, memo, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Overlay } from "shared/ui/Boxes/Overlay";
import { SidebarItem } from "./SidebarItem";
import { getSidebarItems } from "../model/selectors";

type WrappedOverlayProps = {
    style: CSSProperties;
    onClick: () => void;
    className: string;
};

export const Sidebar = memo(() => {
    const dispatch = useAppDispatch();
    const collapsed = useAppSelector(getSidebarCollapsed);
    const { pathname } = useLocation();
    const sidebarItems = useAppSelector(getSidebarItems);

    const handleClose = useCallback(() => dispatch(uiActions.closeSidebar()), [dispatch]);

    const transitions = useTransition(!collapsed, {
        from: { opacity: 0, transform: "translateX(-100%)" },
        enter: { opacity: 1, transform: "translateX(0%)" },
        leave: { opacity: 0, transform: "translateX(-100%)" },
        config: {
            duration: 200,
        },
    });

    const WrappedOverlay: AnimatedComponent<FC<WrappedOverlayProps>> = useMemo(
        () => animated((props) => <Overlay {...props} />),
        []
    );

    if (pathname.includes(routeConfig.login.path)) return null;

    return transitions(
        (style, item) =>
            item && (
                <>
                    <animated.aside
                        style={{ ...style }}
                        className="bg-my-white shadow-sm shadow-my-neutral-200 z-30 py-2 flex flex-col justify-between fixed top-0 left-0 h-[100dvh] mt-14"
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

                    <WrappedOverlay
                        onClick={handleClose}
                        style={{ ...style, transform: "translateX(0)" }}
                        className="3xl:hidden block"
                    />
                </>
            )
    );
});
