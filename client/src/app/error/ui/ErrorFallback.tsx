import { useTranslation } from "react-i18next";
import { routePath } from "@/app/router/router";
import { Box } from "@/shared/ui/Boxes/Box";
import { UserBox } from "@/shared/ui/Boxes/UserBox";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";

type Props = {
    msg: string;
};

const ErrorFallback = ({ msg }: Props) => {
    const { t } = useTranslation();
    return (
        <div className="w-full h-[100dvh] flex items-center justify-center px-2 text-center text-my-neutral-800 font-custom">
            <Box className="max-w-6xl overflow-hidden">
                <div className="flex gap-2 flex-col items-center">
                    <Heading headinglevel={1}>{t("boundary.t")}</Heading>
                    <Text>{t("boundary.b")}</Text>
                </div>
                {Boolean(msg) && (
                    <UserBox className="border rounded-xl justify-start text-start">
                        <Text>{msg}</Text>
                    </UserBox>
                )}

                <a
                    className="text-inherit rounded-xl px-4 active:translate-y-[1px] bg-my-neutral-100 hover:bg-my-neutral-200 focus-visible:bg-my-neutral-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 h-10 text-base shrink-0 flex items-center justify-center font-normal self-center"
                    href={routePath.main}
                >
                    {t("btn.main")}
                </a>
            </Box>
        </div>
    );
};

export default ErrorFallback;
