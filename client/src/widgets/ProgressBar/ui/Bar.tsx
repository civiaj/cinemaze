import { classNames } from "@/shared/lib/classNames";

type Props = {
    progress: number;
    active: boolean;
    transition: number;
};

export const Bar = (props: Props) => {
    const { progress, transition } = props;

    return (
        <div
            className={classNames("bg-blue-500 h-full w-full relative")}
            style={{
                width: `${progress}%`,
                transition: `width ${transition}ms linear`,
            }}
        />
    );
};
