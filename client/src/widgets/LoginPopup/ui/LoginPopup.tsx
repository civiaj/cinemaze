import { routePath } from "@/app/router/router";
import { useAppSelector } from "@/app/store";
import { getIsLogged } from "@/entities/User";
import { classNames } from "@/shared/lib/classNames";
import { Button } from "@/shared/ui/Button/Button";
import { Text } from "@/shared/ui/Text/Text";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const LoginPopup = () => {
    const [isShown, setIsShown] = useState(false);
    const isLogged = useAppSelector(getIsLogged);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        setIsShown(true);
    }, []);

    if (pathname.includes(routePath.login) || isLogged) return null;

    return (
        <div
            className={classNames(
                "fixed bottom-0 left-0 w-full bg-blue-500/90 z-40 flex items-center justify-center delay-[2000ms] transition-all duration-500 ease-in-out translate-y-full backdrop-blur-sm",
                { ["translate-y-0"]: isShown },
                []
            )}
        >
            <div className="max-w-6xl w-full mx-auto px-4 py-4">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col flex-1">
                        <Text className="text-neutral-50 line-clamp-1">{t("msg.welcome")}</Text>
                        <Text className="text-neutral-200 text-sm sm:text-sm line-clamp-1">
                            {t("msg.login-or-auth")}
                        </Text>
                    </div>

                    <div className="flex gap-4">
                        <Button onClick={() => navigate(routePath.login)} theme="regularNav">
                            {t("btn.log-in")}
                        </Button>
                        <Button
                            onClick={() => navigate(routePath.login + "?section=registrate")}
                            theme="regularNav"
                        >
                            {t("btn.register")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
