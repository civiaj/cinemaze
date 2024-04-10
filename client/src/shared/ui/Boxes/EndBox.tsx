import { useTranslation } from "react-i18next";
import { Box } from "@/shared/ui/Boxes/Box";
import { Text } from "@/shared/ui/Text/Text";

type Props = {
    text?: string;
};

export const EndBox = ({ text }: Props) => {
    const { t } = useTranslation();
    return (
        <Box className="text-center py-4 sm:py-4">
            <Text>{text ?? t("end-box-msg")}</Text>
        </Box>
    );
};
