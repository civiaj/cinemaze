import {
    CSSProperties,
    ImgHTMLAttributes,
    MutableRefObject,
    ReactEventHandler,
    useCallback,
    useRef,
    useState,
} from "react";
import fallbackImage from "shared/assets/images/placeholder.jpg";
import { useIntersectionObserver } from "shared/hooks/useIntersectionObserver";
import { classNames } from "shared/lib/classNames";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    containerClassName?: string;
    onErrorSrc?: string;
    containerStyle?: CSSProperties;
}

export const Image = (props: ImageProps) => {
    const { className, containerClassName, src, onErrorSrc, containerStyle, ...otherProps } = props;

    const handleImageError: ReactEventHandler<HTMLImageElement> = (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = onErrorSrc ?? fallbackImage;
    };

    const imageRef = useRef() as MutableRefObject<HTMLImageElement>;
    const [isVisible, setIsVisible] = useState(false);

    const onScrollEnd = useCallback(
        (observer: IntersectionObserver, entry: IntersectionObserverEntry) => {
            setIsVisible(true);
            observer?.unobserve(entry.target);
        },
        []
    );

    useIntersectionObserver({
        targetRef: imageRef,
        onScrollEnd,
    });

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
                src={src}
                className={classNames(
                    "h-full w-full object-cover object-center opacity-0 transition-[opacity] duration-300",
                    { ["opacity-100"]: isVisible },
                    [className]
                )}
                {...otherProps}
            />
        </div>
    );
};
