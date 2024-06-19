import { useTranslation } from "react-i18next";
import { routePath } from "@/app/router/router";
import { useAppSelector } from "@/app/store";
import { useLogoutMutation } from "@/entities/Authorization";
import { TAppearances, appearances, getUiAppearance } from "@/entities/Ui";
import { selectUser } from "@/entities/User";
import { TLngs, lngs } from "@/shared/i18n/types";
import { TThemes, themes, useTheme } from "@/shared/theme";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { UserBoxSeparator } from "@/shared/ui/Boxes/UserBox";
import { Button } from "@/shared/ui/Button/Button";
import { options } from "../../model/options";
import { NavbarOptions, NavbarViews } from "../../model/types";

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

    const [logout, { isLoading }] = useLogoutMutation();
    const user = useAppSelector(selectUser);

    const onLogout = async () => {
        await logout();
        onClose();
    };

    return (
        <div>
            <div className="py-2 px-4">
                {user ? (
                    <AppLink to={routePath.user} theme="button" onClick={onClose}>
                        {t("nav.profile")}
                    </AppLink>
                ) : (
                    <AppLink theme="button-blue" to={routePath.login} onClick={onClose}>
                        {t("btn.log-in")}
                    </AppLink>
                )}
            </div>

            <UserBoxSeparator />

            <ul className="flex flex-col py-2">
                {Object.keys(options).map((optionKey) => {
                    const item = options[optionKey as NavbarOptions];
                    const state = stateLabels[item.value];

                    return (
                        <li key={item.label}>
                            <Button
                                onClick={() => onSetOpenView(item.value)}
                                theme="popup"
                                className="gap-4 py-2 w-full justify-start"
                            >
                                {
                                    <item.Icon className="w-8 flex items-center justify-center text-xl shrink-0" />
                                }
                                {t(item.label)}: {t(state as string)}
                            </Button>
                        </li>
                    );
                })}
            </ul>
            {user && (
                <>
                    <UserBoxSeparator />
                    <div className="py-2 px-4">
                        <Button
                            isLoading={isLoading}
                            theme="blue"
                            className="w-full"
                            onClick={onLogout}
                        >
                            {t("btn.log-out")}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};
