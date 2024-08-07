import { easings, animated, useTransition } from "@react-spring/web";
import { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useAppSelector } from "@/app/store";
import { getIsMobile } from "@/entities/Ui";
import { Close } from "@/shared/assets/icons";
import { classNames } from "@/shared/lib/classNames";
import { Button } from "@/shared/ui/Button/Button";
import { Text } from "@/shared/ui/Text/Text";

export const LoginPopup = memo(() => {
    const [isShown, setIsShown] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isMobile = useAppSelector(getIsMobile);
    const timer = useRef<ReturnType<typeof setTimeout>>();

    const transitions = useTransition(isShown, {
        from: { transform: "translateY(100%)", opacity: 0 },
        enter: { transform: "translateY(0px)", opacity: 1 },
        leave: { transform: "translateY(100%)", opacity: 0 },
        config: {
            duration: 200,
            easing: easings.easeInOutCubic,
        },
    });

    const condition = pathname.includes(routePath.login);

    useEffect(() => {
        timer.current = setTimeout(() => {
            setIsShown(true);
        }, 2000);

        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, []);

    if (condition) return null;

    return transitions(
        (style, val) =>
            val && (
                <animated.div
                    style={style}
                    className={classNames(
                        "fixed bottom-0 w-full z-40 delay-0 pointer-events-none",
                        { ["bottom-12"]: isMobile },
                        []
                    )}
                >
                    <div className="bg-blue-500/90 rounded-t-xl max-w-xl px-4 py-4 flex flex-col gap-2 backdrop-blur-sm mx-auto pointer-events-auto">
                        <div className="flex justify-between gap-4 items-start">
                            <Text className="text-neutral-50 text-lg sm:text-lg font-medium">
                                {t("msg.welcome")}
                            </Text>
                            <Button
                                onClick={() => setIsShown(false)}
                                theme="regularNav"
                                className="h-6 w-6 p-0 flex items-center justify-center bg-neutral-50 text-neutral-900 hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:ring-neutral-900"
                            >
                                <Close />
                            </Button>
                        </div>

                        <Text className="text-neutral-200">{t("msg.login-or-auth")}</Text>

                        <div className="flex gap-2 self-end">
                            <Button
                                onClick={() => navigate(routePath.login)}
                                className="bg-neutral-50 text-neutral-900 hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:ring-neutral-900"
                                theme="regularNav"
                            >
                                {t("btn.log-in")}
                            </Button>
                            <Button
                                onClick={() => navigate(routePath.login + "?section=registrate")}
                                theme="regularNav"
                                className="bg-neutral-50 text-neutral-900 hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:ring-neutral-900"
                            >
                                {t("btn.register")}
                            </Button>
                        </div>
                    </div>
                </animated.div>
            )
    );
});
