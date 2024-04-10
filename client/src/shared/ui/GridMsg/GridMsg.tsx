import { useTransition, animated } from "@react-spring/web";
import { ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames";

type Props = {
    msg?: string | null;
    className?: string;
    isOpen: boolean;
    children?: ReactNode;
};

export const GridMsg = (props: Props) => {
    const { msg, className, isOpen, children } = props;
    const transition = useTransition(isOpen, {
        from: { opacity: 0, gridTemplateRows: "0fr" },
        enter: { opacity: 1, gridTemplateRows: "1fr" },
        config: { duration: 100 },
    });

    return transition(
        (style, condition) =>
            condition &&
            (msg || children) && (
                <animated.div style={style} className="grid">
                    <div className={classNames("rounded-xl overflow-hidden", {}, [className])}>
                        {children ? (
                            children
                        ) : (
                            <p className="text-sm px-4 py-2 text-neutral-50">{msg}</p>
                        )}
                    </div>
                </animated.div>
            )
    );
};
