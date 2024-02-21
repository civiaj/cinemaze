import { Overlay } from "shared/ui/Boxes/Overlay";
import { Spinner } from "./Spinner";

type Props = { className?: string };
export const FullscreenSpinner = ({ className }: Props) => {
    return (
        <Overlay className={className}>
            <Spinner className="text-neutral-200 dark:text-neutral-800 fill-blue-500" />
        </Overlay>
    );
};
