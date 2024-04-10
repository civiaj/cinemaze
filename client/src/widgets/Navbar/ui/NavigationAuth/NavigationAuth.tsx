import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { routePath } from "@/app/router/router";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { getNavbarAuthCollapsed, uiActions } from "@/entities/Ui";
import { selectUser } from "@/entities/User";
import { Left, Login } from "@/shared/assets/icons";
import withPopup from "@/shared/hoc/withPopup";
import { AppImage } from "@/shared/ui/AppImage/AppImage";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { Box } from "@/shared/ui/Boxes/Box";
import { Button } from "@/shared/ui/Button/Button";
import { Elipsis } from "@/shared/ui/Text/Elipsis";
import { OutsideClickWrapper } from "@/widgets/OutsideClickWrapper/OutsideClickWrapper";
import { NavbarOptions, NavbarViews } from "../../model/types";
import { NavbarAppearance } from "./NavbarAppearance";
import { NavbarLang } from "./NavbarLang";
import { NavbarMain } from "./NavbarMain";
import { NavbarTheme } from "./NavbarTheme";

const titles: Record<NavbarOptions, string> = {
    language: "nav.language-t",
    theme: "nav.theme-t",
    appearance: "nav.appearance-t",
};

export const NavigationAuth = () => {
    const navbarAuthCollapsed = useAppSelector(getNavbarAuthCollapsed);
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    const onClose = useCallback(() => {
        dispatch(uiActions.toggleNavbarAuth(true));
    }, [dispatch]);

    const onToggle = useCallback(() => {
        dispatch(uiActions.toggleNavbarAuth(!navbarAuthCollapsed));
    }, [dispatch, navbarAuthCollapsed]);

    return (
        <OutsideClickWrapper onClose={onClose}>
            {user ? (
                <Button theme="regularNavIcon" onClick={onToggle} className="overflow-hidden">
                    <AppImage
                        src={user.photo}
                        onErrorSrc="user"
                        containerClassName="bg-transparent"
                        className="transition-none"
                    />
                </Button>
            ) : (
                <Button theme="login" onClick={onToggle}>
                    <Login />
                </Button>
            )}
            <NavigationAuthBodyPopup transitionValue={!navbarAuthCollapsed} onClose={onClose} />
        </OutsideClickWrapper>
    );
};

const NavigationAuthBody = ({ onClose }: { onClose: () => void }) => {
    const [openView, setOpenView] = useState<NavbarViews>("main");
    const onSetOpenView = useCallback((newView: NavbarViews) => setOpenView(newView), []);
    const user = useAppSelector(selectUser);
    const { t } = useTranslation();

    return (
        <Box className="absolute right-0 top-full mt-6 p-0 sm:p-0 gap-0 sm:gap-0 overflow-hidden w-72">
            {user && (
                <div className="flex gap-4 py-6 px-4 border-b border-border items-center">
                    <AppImage
                        src={user.photo}
                        containerClassName="w-12 h-12 rounded-xl shrink-0"
                        onErrorSrc="user"
                        className="transition-none"
                    />
                    <div className="flex flex-col">
                        <p
                            className="font-medium w-full line-clamp-1 break-words"
                            title={user.displayName}
                        >
                            {user.displayName}
                        </p>
                        <p className="text-sm line-clamp-1 break-words" title={user.email}>
                            {user.email}
                        </p>
                        <AppLink
                            className="underline text-blue-500"
                            to={routePath.favorite}
                            onClick={onClose}
                        >
                            {t("nav.moovies")}
                        </AppLink>
                    </div>
                </div>
            )}
            {openView && openView !== "main" && (
                <div className="py-2 px-4 flex gap-4 items-center border-b border-border overflow-hidden">
                    <Button
                        onClick={() => onSetOpenView("main")}
                        theme="regularIcon"
                        className="rounded-full"
                    >
                        <Left />
                    </Button>
                    <Elipsis className="font-medium sm:text-xl text-lg">
                        {t(titles[openView])}
                    </Elipsis>
                </div>
            )}
            {openView === "main" && <NavbarMain onSetOpenView={onSetOpenView} onClose={onClose} />}
            {openView === "theme" && <NavbarTheme />}
            {openView === "language" && <NavbarLang />}
            {openView === "appearance" && <NavbarAppearance />}
        </Box>
    );
};

type Props = {
    transitionValue: boolean;
    onClose: () => void;
};

const NavigationAuthBodyPopup = ({ transitionValue, onClose }: Props) => {
    const Component = withPopup(NavigationAuthBody, { transitionValue });
    return <Component onClose={onClose} />;
};
