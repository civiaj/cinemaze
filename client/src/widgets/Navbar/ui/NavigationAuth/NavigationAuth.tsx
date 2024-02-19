import { routePath } from "app/router/router";
import { useAppSelector } from "app/store";
import { selectUser } from "entities/User";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Left, Login } from "shared/assets/icons";
import defaultUser from "shared/assets/images/default-user.png";
import withPopup from "shared/hoc/withPopup";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";
import { Image } from "shared/ui/Image/Image";
import { OutsideClickWrapper } from "shared/ui/OutsideClickWrapper/OutsideClickWrapper";
import { Elipsis } from "shared/ui/Text/Elipsis";
import { NavbarOptions, NavbarViews } from "widgets/Navbar/model/types";
import { NavbarAppearance } from "widgets/Navbar/ui/NavigationAuth/NavbarAppearance";
import { NavbarLang } from "widgets/Navbar/ui/NavigationAuth/NavbarLang";
import { NavbarMain } from "widgets/Navbar/ui/NavigationAuth/NavbarMain";
import { NavbarTheme } from "widgets/Navbar/ui/NavigationAuth/NavbarTheme";

const titles: Record<NavbarOptions, string> = {
    language: "Language",
    theme: "Theme",
    appearance: "Appearance",
};

export const NavigationAuth = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useAppSelector(selectUser);
    const onClose = useCallback(() => setIsOpen(false), []);

    return (
        <OutsideClickWrapper onClose={onClose}>
            {user ? (
                <Button theme="regularNavIcon" onClick={() => setIsOpen(true)}>
                    <Image
                        src={user.photo}
                        onErrorSrc={defaultUser}
                        containerClassName="bg-transparent"
                    />
                </Button>
            ) : (
                <Button theme="login" onClick={() => setIsOpen(true)}>
                    <Login />
                </Button>
            )}
            <NavigationAuthBodyPopup transitionValue={isOpen} onClose={onClose} />
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
                <div className="flex gap-4 py-6 px-4 border-b border-my-neutral-100">
                    <Image
                        src={user.photo}
                        containerClassName="w-12 h-12 rounded-xl shrink-0"
                        onErrorSrc={defaultUser}
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
                            {t("mymoovies")}
                        </AppLink>
                    </div>
                </div>
            )}
            {openView && openView !== "main" && (
                <div className="py-2 px-4 flex gap-4 items-center border-b border-my-neutral-100 overflow-hidden">
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
