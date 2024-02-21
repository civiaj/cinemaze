import { Overlay } from "shared/ui/Boxes/Overlay";
import { Spinner } from "./Spinner";

type Props = { className?: string };
export const FullscreenSpinner = ({ className }: Props) => {
    return (
        <Overlay className={className}>
            <Spinner className="text-neutral-300 dark:text-neutral-300 fill-blue-500" />
        </Overlay>
    );
};
