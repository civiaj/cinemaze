import { useUpdateHeight } from "shared/hooks/useUpdateHeight";
import { classNames } from "shared/lib/classNames";
import { Image } from "shared/ui/Image/Image";

type Props = {
    src?: string;
    isShown: boolean;
    onSetIsShown: () => void;
};

const restHeight = 255;

export const ImagePreviewBody = ({ src, onSetIsShown, isShown }: Props) => {
    const maxHeight = useUpdateHeight(restHeight);

    return (
        <div className="h-full w-full col-span-5">
            <div className="flex items-center justify-center h-full">
                <Image
                    onLoad={() => onSetIsShown()}
                    src={src}
                    containerStyle={{ maxHeight }}
                    containerClassName={classNames(" bg-transparent block", {
                        ["hidden"]: !isShown,
                    })}
                    className="object-scale-down"
                    loading="eager"
                />
            </div>
        </div>
    );
};
