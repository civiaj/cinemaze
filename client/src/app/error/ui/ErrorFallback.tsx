import { routePath } from "app/router/router";
import { useTranslation } from "react-i18next";
import { Box } from "shared/ui/Boxes/Box";

import { Heading } from "shared/ui/Text/Heading";

const ErrorFallback = () => {
    const { t } = useTranslation();
    return (
        <div className="w-full h-[100dvh] flex items-center justify-center px-2 text-center text-my-neutral-800">
            <Box className="sm:gap-6 gap-6">
                <div className="flex gap-2 flex-col items-center">
                    <Heading headinglevel={1} className="text-blue-500">
                        {t("boundary.t")}
                    </Heading>
                    <p>{t("boundary.b")}</p>
                </div>
                <a
                    className="h-10 rounded-xl bg-my-neutral-100 hover:bg-my-neutral-200 focus:bg-my-neutral-200 flex items-center justify-center self-center px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    href={routePath.main}
                >
                    {t("btn.main")}
                </a>
            </Box>
        </div>
    );
};

export default ErrorFallback;
