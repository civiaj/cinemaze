import { DragEvent, RefObject, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { useTranslation } from "react-i18next";
import { File } from "@/shared/assets/icons";
import { classNames } from "@/shared/lib/classNames";
import { Modal } from "@/shared/ui/Boxes/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { Text } from "@/shared/ui/Text/Text";
import { CROP_MIN_WIDTH, acceptInput, formatError, formats } from "../../model/config";
import { UserPhotoModal } from "./UserPhotoModal";

type Props = {
    onClose: () => void;
    isDefault: boolean;
    onSetSection: (value: "current" | "change" | "remove") => void;
};

export const UserChangePhoto = ({ onClose, isDefault, onSetSection }: Props) => {
    const [isDrag, setIsDrag] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const onCloseModal = () => setIsModal(false);
    const onOpenModal = () => setIsModal(true);
    const filePicker = useRef<HTMLInputElement>(null);
    const [wrongFormat, setWrongFormat] = useState<string | null>(null);
    const [imageRef, setImageRef] = useState<RefObject<HTMLImageElement>>();

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [finalCrop, setFinalCrop] = useState<Area>();
    const [zoom, setZoom] = useState(1);

    const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
        setFinalCrop(croppedAreaPixels);
    };

    const [file, setFile] = useState<string | null>(null);
    const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDrag(true);
    };

    const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDrag(false);
    };

    const onFileDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const type = file.type.split("/")[1];
        formats.includes(type) ? onShowFile(file) : setWrongFormat(formatError.type);
        setIsDrag(false);
    };

    const onFileAdd = (e: React.SyntheticEvent<EventTarget>) => {
        const target = e.target as HTMLInputElement & { files: FileList };
        onShowFile(target.files[0]);
    };

    const onCancel = () => {
        setFile(null);
    };

    const onShowFile = (file: File) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const image = new Image();
            const src = e.target?.result?.toString() || "";
            image.src = src;
            image.addEventListener("load", (e) => {
                if (wrongFormat) setWrongFormat(null);
                const { naturalHeight, naturalWidth } = e.currentTarget as HTMLImageElement;
                if (naturalHeight < CROP_MIN_WIDTH || naturalWidth < CROP_MIN_WIDTH) {
                    setFile(null);
                    setWrongFormat(formatError.size);
                    return;
                }
            });
            setFile(src);
        };
        fileReader.readAsDataURL(file);
    };

    const { t } = useTranslation();

    return !file ? (
        <Modal onClose={onClose} preventClose>
            <Modal.Header onClose={onClose} header={t("user.photo-change")} />
            <Modal.Body>
                <div
                    className={classNames(
                        "flex items-center justify-center relative h-80 -mx-6 -my-4",
                        {
                            ["bg-my-neutral-100"]: isDrag,
                        }
                    )}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDragOver={onDragEnter}
                    onDrop={onFileDrop}
                >
                    <div className="z-[1] pointer-events-none flex flex-col text-center">
                        <Text>{isDrag ? t("user.photo-drop") : t("user.photo-drag")}</Text>
                        {wrongFormat && <Text className="font-medium">{wrongFormat}</Text>}
                    </div>
                    <File
                        className={classNames(
                            "text-9xl absolute opacity-5 pointer-events-none transition-transform",
                            {
                                ["scale-125"]: isDrag,
                            }
                        )}
                    />
                </div>
            </Modal.Body>
            <Modal.Controls theme="none">
                <Button theme="blue" onClick={() => filePicker.current?.click()}>
                    <Text>{t("btn.choose")}</Text>
                </Button>
                {!isDefault && (
                    <Button onClick={() => onSetSection("current")} theme="regular">
                        {t("btn.back")}
                    </Button>
                )}
                <input
                    onChange={onFileAdd}
                    ref={filePicker}
                    style={{ display: "none" }}
                    type="file"
                    accept={acceptInput}
                    multiple={false}
                    tabIndex={-1}
                />
            </Modal.Controls>
        </Modal>
    ) : (
        <Modal onClose={onClose} className="h-[100vh]" preventClose>
            <Modal.Header onClose={onClose} header={t("user.photo-crop")} />
            <Modal.Body className="p-0 sm:p-0">
                <div className="flex items-center justify-center overflow-hidden relative h-full">
                    <Cropper
                        image={file}
                        crop={crop}
                        zoom={zoom}
                        aspect={1 / 1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        cropShape="rect"
                        zoomWithScroll={true}
                        setImageRef={(ref) => setImageRef(ref)}
                    />
                </div>
            </Modal.Body>

            <Modal.Controls theme="none">
                <Button onClick={onOpenModal} theme="blue">
                    <Text>{t("btn.confirm")}</Text>
                </Button>
                <Button theme="regular" onClick={onCancel}>
                    <Text>{t("btn.back")}</Text>
                </Button>
            </Modal.Controls>

            <UserPhotoModal
                image={imageRef?.current}
                crop={finalCrop}
                onCloseModal={onCloseModal}
                isModal={isModal}
            />
        </Modal>
    );
};
