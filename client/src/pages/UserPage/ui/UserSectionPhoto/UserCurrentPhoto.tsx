import { useTranslation } from "react-i18next";
import { AppImage } from "shared/ui/AppImage/AppImage";
import { UserBoxSeparator } from "shared/ui/Boxes/UserBox";
import { Button } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";

type Props = {
    photo: string;
    onSetIs: (val: "1" | "2" | null) => void;
    noPhoto: boolean;
};

export const UserCurrentPhoto = ({ photo, onSetIs, noPhoto }: Props) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col h-full justify-center gap-4">
            <div className="flex items-center justify-center">
                <Button
                    onClick={() => onSetIs("1")}
                    tabIndex={-1}
                    className="w-72 h-72 rounded-full overflow-hidden relative group focus:ring-my-neutral-800 self-center"
                >
                    <AppImage
                        src={photo}
                        onErrorSrc="user"
                        className="w-72 h-72 -z-10 transition-none"
                    />
                </Button>
            </div>
            <UserBoxSeparator />

            <div className="flex gap-2 self-center">
                <Button onClick={() => onSetIs("1")} theme="regular">
                    <Text>{t("btn.change")}</Text>
                </Button>
                {!noPhoto && (
                    <Button theme="danger" onClick={() => onSetIs("2")}>
                        <Text>{t("btn.delete")}</Text>
                    </Button>
                )}
            </div>
        </div>
    );
};
