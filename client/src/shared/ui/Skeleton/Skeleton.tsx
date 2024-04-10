import { classNames } from "@/shared/lib/classNames";

interface SkeletonProps {
    className?: string;
}

export const Skeleton = (props: SkeletonProps) => {
    const { className } = props;
    return (
        <div
            className={classNames("bg-my-neutral-100 rounded-xl animate-pulse", {}, [className])}
        />
    );
};
