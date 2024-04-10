import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Crop, convertToPixelCrop } from "react-image-crop";
import { useNavigate } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useUpdatePhotoMutation } from "@/entities/User";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { classNames } from "@/shared/lib/classNames";
import { Box } from "@/shared/ui/Boxes/Box";
import { UserBox, UserBoxSeparator } from "@/shared/ui/Boxes/UserBox";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";
import { getPreviewCanvas } from "../../helpers/getPreviewCanvas";
import { UserModalAnimationHoc } from "./UserModalAnimationHoc";

type Props = {
    image: HTMLImageElement | null;
    crop?: Crop;
    onCloseModal: () => void;
    isModal: boolean;
};

const Modal = ({ image, crop, onCloseModal, isModal }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [updatePhoto, { isLoading, error, isError }] = useUpdatePhotoMutation();
    const navigate = useNavigate();

    const onSave = async () => {
        if (!image || !canvasRef.current || !crop) return;
        const pixelCrop = convertToPixelCrop(crop, image.width, image.height);
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const offscreen = new OffscreenCanvas(pixelCrop.width * scaleX, pixelCrop.height * scaleY);
        const ctx = offscreen.getContext("2d");
        if (!ctx) {
            throw new Error("No 2d context");
        }

        ctx.drawImage(
            canvasRef.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
            0,
            0,
            offscreen.width,
            offscreen.height
        );

        const blob = await offscreen.convertToBlob({
            type: "image/jpeg",
            quality: 0.9,
        });

        const formData = new FormData();
        formData.append("image", blob);

        updatePhoto(formData)
            .unwrap()
            .then(() => navigate(routePath.user));
    };

    const { t } = useTranslation();

    useEffect(() => {
        if (image && canvasRef.current && crop && isModal) {
            const pixelCrop = convertToPixelCrop(crop, image.width, image.height);
            getPreviewCanvas(image, canvasRef.current, pixelCrop);
        }
    }, [image, crop, isModal]);

    return (
        <Box className={classNames("gap-0 sm:gap-0 p-0 sm:p-0 shadow-0")}>
            <UserBox>
                <Heading headinglevel={1}>{t("user.photo-preview")}</Heading>
            </UserBox>
            <UserBox className="gap-2 sm:gap-4">
                <div className="flex items-center justify-center">
                    <canvas className="w-[250px] h-[250px] rounded-xl" ref={canvasRef} />
                </div>

                <GridMsg
                    isOpen={isError}
                    msg={formatServerError(error)}
                    className="bg-my-red-300"
                />
                <UserBoxSeparator />
                <div className="border-0 flex self-center gap-2">
                    <Button isLoading={isLoading} onClick={onSave} theme="blue">
                        <Text>{t("btn.save")}</Text>
                    </Button>
                    <Button theme="regular" onClick={onCloseModal}>
                        <Text>{t("btn.cancel")}</Text>
                    </Button>
                </div>
            </UserBox>
            <div className="w-full h-2 shrink-0 bg-blue-500" />
        </Box>
    );
};

export const UserPhotoModal = (props: Props) => {
    const Component = UserModalAnimationHoc<Props>(Modal, {
        transitionValue: props.isModal,
        onCloseModal: props.onCloseModal,
    });

    return <Component {...props} />;
};
