import { useTransition, animated } from "@react-spring/web";

import { classNames } from "shared/lib/classNames";

type Props = {
    msg?: string | null;
    className?: string;
    isError: boolean;
};

export const FormErrorMsg = (props: Props) => {
    const { msg, className, isError } = props;

    const transition = useTransition(isError, {
        from: { opacity: 0, gridTemplateRows: "0fr" },
        enter: { opacity: 1, gridTemplateRows: "1fr" },
        config: { duration: 100 },
    });

    return transition(
        (style, condition) =>
            condition &&
            msg && (
                <animated.div style={style} className={classNames("grid", {}, [className])}>
                    <div className="bg-my-red-200 rounded-xl overflow-hidden">
                        <p className="text-sm px-4 py-2">{msg}</p>
                    </div>
                </animated.div>
            )
    );
};
