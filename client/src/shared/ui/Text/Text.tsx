import { classNames } from "@/shared/lib/classNames";

type Props<T extends React.ElementType> = {
    className?: string;
    children: React.ReactNode;
    as?: "p" | "span";
} & React.ComponentProps<T>;

export const Text = <T extends React.ElementType = "span">({
    className,
    children,
    as: Component = "span",
    ...other
}: Props<T>) => {
    return (
        <Component className={classNames("text-sm sm:text-base", {}, [className])} {...other}>
            {children}
        </Component>
    );
};
