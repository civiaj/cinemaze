import { useEffect, useRef, useState } from "react";
import { Area } from "react-easy-crop";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useUpdatePhotoMutation } from "@/entities/User";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { Modal } from "@/shared/ui/Boxes/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { Text } from "@/shared/ui/Text/Text";
import { getPreviewCanvas } from "../../helpers/getPreviewCanvas";

type Props = {
    image?: HTMLImageElement | null;
    crop?: Area;
    onCloseModal: () => void;
    isModal: boolean;
};

export const UserPhotoModal = ({ image, crop, onCloseModal, isModal }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { t } = useTranslation();
    const [updatePhoto, { isLoading, error, isError }] = useUpdatePhotoMutation();
    const [canvasError, setCanvasError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSave = async () => {
        if (!image || !canvasRef.current || !crop) return;
        if (
            typeof OffscreenCanvas !== "undefined" &&
            typeof OffscreenCanvas.prototype.convertToBlob === "function"
        ) {
            const offscreen = new OffscreenCanvas(crop.width, crop.height);
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
        } else {
            const canvas = document.createElement("canvas");
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                throw new Error("No 2d context");
            }
            ctx.drawImage(
                image,
                crop.x,
                crop.y,
                crop.width,
                crop.height,
                0,
                0,
                canvas.width,
                canvas.height
            );
            canvas.toBlob(
                async (blob) => {
                    if (!blob) {
                        throw new Error("Failed to convert canvas to blob");
                    }
                    const formData = new FormData();
                    formData.append("image", blob);
                    updatePhoto(formData)
                        .unwrap()
                        .then(() => navigate(routePath.user));
                },
                "image/jpeg",
                0.9
            );
        }
    };

    useEffect(() => {
        if (isModal) {
            try {
                getPreviewCanvas(image, canvasRef.current, crop);
            } catch (error) {
                if (error instanceof Error) setCanvasError(error.message);
            }
        }
    }, [image, crop, isModal]);

    return (
        <Modal.Dialog onCloseDialog={onCloseModal} transitionValue={isModal}>
            <Modal.Header onClose={onCloseModal} header={t("user.photo-preview")} />

            <Modal.Body>
                <div className="flex items-center justify-center">
                    <canvas
                        className="w-[250px] h-[250px] rounded-xl self-center"
                        ref={canvasRef}
                    />
                </div>
                <GridMsg
                    isError
                    isOpen={isError || Boolean(canvasError)}
                    msg={canvasError || formatServerError(error)}
                />
            </Modal.Body>
            <Modal.Controls theme="confirm">
                <Button isLoading={isLoading} onClick={onSave} theme="blue">
                    <Text>{t("btn.save")}</Text>
                </Button>
                <Button theme="regular" onClick={onCloseModal}>
                    <Text>{t("btn.cancel")}</Text>
                </Button>
            </Modal.Controls>
        </Modal.Dialog>
    );
};
