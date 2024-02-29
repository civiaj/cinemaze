import {
    CSSProperties,
    ImgHTMLAttributes,
    MutableRefObject,
    ReactEventHandler,
    useRef,
} from "react";
import defaultUser from "shared/assets/images/default-user.jpeg";
import fallbackImage from "shared/assets/images/placeholder.jpg";
import { classNames } from "shared/lib/classNames";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    containerClassName?: string;
    onErrorSrc?: "user";
    containerStyle?: CSSProperties;
}

export const AppImage = (props: ImageProps) => {
    const { className, containerClassName, src, onErrorSrc, containerStyle, ...otherProps } = props;

    const handleImageError: ReactEventHandler<HTMLImageElement> = (e) => {
        e.currentTarget.onerror = null;

        let errorImage;

        switch (onErrorSrc) {
            case "user": {
                errorImage = defaultUser;
                break;
            }
            default: {
                errorImage = fallbackImage;
                break;
            }
        }

        e.currentTarget.src = errorImage;
    };

    const imageRef = useRef() as MutableRefObject<HTMLImageElement>;

    const source =
        onErrorSrc === "user" ? import.meta.env.VITE_SERVER_STATIC_USER_PHOTO + src : src;

    return (
        <div
            style={containerStyle}
            className={classNames("relative h-full w-full bg-my-neutral-100 overflow-hidden", {}, [
                containerClassName,
            ])}
        >
            <img
                ref={imageRef}
                onError={handleImageError}
                loading="lazy"
                src={source}
                className={classNames(
                    "h-full w-full object-cover object-center opacity-100 transition-[opacity] duration-300",
                    {},
                    [className]
                )}
                {...otherProps}
            />
        </div>
    );
};
