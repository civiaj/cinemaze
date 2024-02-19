import { routePath } from "app/router/router";
import { useAppSelector } from "app/store";
import { themes, useTheme } from "app/theme";
import { useLogoutMutation } from "entities/Authorization";
import { selectUser } from "entities/User";
import { useNavigate } from "react-router-dom";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Button } from "shared/ui/Button/Button";
import { options } from "widgets/Navbar/model/options";
import { NavbarOptions, NavbarViews } from "../../model/types";
import { useTranslation } from "react-i18next";
import { TLngs, lngs } from "shared/i18n/types";
import { TThemes } from "app/theme";
import { TAppearances, appearances, getUiAppearance } from "entities/Ui";
import { Elipsis } from "shared/ui/Text/Elipsis";

type Props = {
    onSetOpenView: (newContext: NavbarViews) => void;
    onClose: () => void;
};

export const NavbarMain = ({ onSetOpenView, onClose }: Props) => {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const appearance = useAppSelector(getUiAppearance);

    const stateLabels: Record<NavbarOptions, string> = {
        language: lngs[i18n.language as TLngs].label as string,
        theme: themes[theme as TThemes].label as string,
        appearance: appearances[appearance as TAppearances].label as string,
    };

    const navigate = useNavigate();
    const [logout, { isLoading }] = useLogoutMutation();
    const user = useAppSelector(selectUser);

    const onLogout = async () => {
        await logout();
        navigate(routePath.main, { replace: true });
        onClose();
    };

    return (
        <div>
            <div className="py-2 px-4 border-b border-my-neutral-100">
                {user ? (
                    <AppLink to={""} theme="button" onClick={onClose}>
                        {t("myprofile")}
                    </AppLink>
                ) : (
                    <AppLink theme="button-blue" to={routePath.login} onClick={onClose}>
                        {t("signin")}
                    </AppLink>
                )}
            </div>

            <ul className="flex flex-col py-2">
                {Object.keys(options).map((optionKey) => {
                    const item = options[optionKey as NavbarOptions];
                    const state = stateLabels[item.value];

                    return (
                        <li key={item.label}>
                            <Button
                                onClick={() => onSetOpenView(item.value)}
                                theme="popup"
                                className="gap-4 py-2 text-base w-full justify-start"
                            >
                                {
                                    <item.Icon className="w-8 flex items-center justify-center text-xl shrink-0" />
                                }
                                <Elipsis>
                                    {t(item.label)}: {t(state as string)}
                                </Elipsis>
                            </Button>
                        </li>
                    );
                })}
            </ul>
            {user && (
                <div className="py-2 px-4 flex justify-end">
                    <Button
                        isLoading={isLoading}
                        theme="blue"
                        className="self-end"
                        onClick={onLogout}
                    >
                        {t("signout")}
                    </Button>
                </div>
            )}
        </div>
    );
};
