import { t } from "i18next";
import { Left } from "shared/assets/icons";
import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";
import { Heading } from "shared/ui/Text/Heading";

type Props = {
    photo: string;
    onChangeSection: (newSection: null) => void;
};

export const UserSectionPhoto = (props: Props) => {
    const { photo, onChangeSection } = props;

    return (
        <Box className="sm:p-0 p-0">
            <div className="sm:py-6 sm:px-6 py-4 px-2 border-b border-border flex items-center gap-4">
                <Button
                    onClick={() => onChangeSection(null)}
                    theme="regularIcon"
                    className="rounded-full"
                >
                    <Left />
                </Button>
                <Heading headinglevel={1} className="font-medium">
                    {t("Name")}
                </Heading>
            </div>
        </Box>
    );
};
