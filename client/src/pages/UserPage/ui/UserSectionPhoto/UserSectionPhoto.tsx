import { t } from "i18next";
import { UserChangePhoto } from "pages/UserPage/ui/UserSectionPhoto/UserChangePhoto";
import { UserCurrentPhoto } from "pages/UserPage/ui/UserSectionPhoto/UserCurrentPhoto";
import { UserPhotoDeleteModal } from "pages/UserPage/ui/UserSectionPhoto/UserPhotoDeleteModal";
import "react-image-crop/dist/ReactCrop.css";
import { useSearchParams } from "react-router-dom";
import { Left } from "shared/assets/icons";
import { Modal } from "shared/ui/Boxes/Modal";
import { UserBox } from "shared/ui/Boxes/UserBox";
import { Button } from "shared/ui/Button/Button";
import { Heading } from "shared/ui/Text/Heading";

type Props = {
    photo: string;
    onClose: () => void;
};

const defaultPhoto = import.meta.env.VITE_STATIC_PROFILE_DEFAULT;

export const UserSectionPhoto = (props: Props) => {
    const { photo, onClose } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const noPhoto = photo === defaultPhoto;

    const isChanging = noPhoto || searchParams.get("change") === "1";
    const isDeleting = !noPhoto && searchParams.get("change") === "2";
    const withBtn = !noPhoto && isChanging;

    const onSetIs = (val: "1" | "2" | null) => {
        if (!val) {
            searchParams.delete("change");
            setSearchParams(searchParams);
        } else {
            searchParams.set("change", val);
            setSearchParams(searchParams);
        }
    };

    return (
        <Modal
            onClose={onClose}
            header={
                !withBtn ? (
                    t("user.photo")
                ) : (
                    <UserBox className="flex-row gap-4 items-center">
                        <Button
                            onClick={() => onSetIs(null)}
                            theme="regularIcon"
                            className="rounded-full"
                        >
                            <Left />
                        </Button>
                        <Heading headinglevel={1}>{t("user.photo")}</Heading>
                    </UserBox>
                )
            }
            preventClose={isChanging || isDeleting}
        >
            {isChanging ? (
                <UserChangePhoto />
            ) : (
                <UserCurrentPhoto noPhoto={noPhoto} photo={photo} onSetIs={onSetIs} />
            )}

            <UserPhotoDeleteModal isModal={isDeleting} onClose={() => onSetIs(null)} />
        </Modal>
    );
};
