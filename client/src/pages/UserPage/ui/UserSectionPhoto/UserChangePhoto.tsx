import { DragEvent, SyntheticEvent, useRef, useState } from "react";
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import { File } from "shared/assets/icons";
import { classNames } from "shared/lib/classNames";
import { UserBoxSeparator } from "shared/ui/Boxes/UserBox";
import { Button } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";

import { CROP_ASPECT, CROP_MIN_WIDTH, acceptInput, formatError, formats } from "../../model/config";
import { UserPhotoModal } from "./UserPhotoModal";

export const UserChangePhoto = () => {
    const [isDrag, setIsDrag] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const onCloseModal = () => setIsModal(false);
    const onOpenModal = () => setIsModal(true);
    const filePicker = useRef<HTMLInputElement>(null);
    const [wrongFormat, setWrongFormat] = useState<string | null>(null);

    const imgRef = useRef<HTMLImageElement>(null);

    const [crop, setCrop] = useState<Crop>();

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

    const onSetCrop = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        const { width, height } = e.currentTarget;
        const cropWidth = (CROP_MIN_WIDTH / width) * 100;
        const crop = makeAspectCrop({ unit: "%", width: cropWidth }, CROP_ASPECT, width, height);
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
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

    return !file ? (
        <>
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
                    <Text>{isDrag ? "Отпустите файл" : "Перенесите файл"}</Text>
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
            <UserBoxSeparator />
            <Button
                theme="blue"
                className="self-center"
                onClick={() => filePicker.current?.click()}
            >
                <Text>Выбрать</Text>
            </Button>

            <input
                onChange={onFileAdd}
                ref={filePicker}
                style={{ display: "none" }}
                type="file"
                accept={acceptInput}
                multiple={false}
            />
        </>
    ) : (
        <>
            <div className="flex items-center justify-center -mx-6 -my-4">
                <ReactCrop
                    minWidth={CROP_MIN_WIDTH}
                    aspect={CROP_ASPECT}
                    crop={crop}
                    onChange={(_, percent) => setCrop(percent)}
                    circularCrop
                    keepSelection
                    className="w-full h-full"
                >
                    <img
                        ref={imgRef}
                        src={file}
                        onLoad={onSetCrop}
                        className="w-full h-full select-none"
                    />
                </ReactCrop>
            </div>

            <UserBoxSeparator />

            <div className="flex gap-2 self-center">
                <Button onClick={onOpenModal} theme="blue">
                    <Text>Подтвердить</Text>
                </Button>
                <Button theme="regular" onClick={onCancel}>
                    <Text>Назад</Text>
                </Button>
            </div>

            <UserPhotoModal
                image={imgRef.current}
                crop={crop}
                onCloseModal={onCloseModal}
                isModal={isModal}
            />
        </>
    );
};
