import { useTransition, animated } from "@react-spring/web";

type WithPopupProps = {
    transitionValue: string | number | boolean | null;
    className?: string;
    [key: string]: string | number | boolean | null | undefined;
};

const withPopup = <T,>(Component: React.ComponentType<T>, withPopupProps: WithPopupProps) => {
    const { className, transitionValue, ...otherProps } = withPopupProps;

    const ComponentWithPopup = (props: T & JSX.IntrinsicAttributes) => {
        const transition = useTransition(transitionValue, {
            from: { opacity: 0, transform: "scale(0.9)" },
            enter: { opacity: 1, transform: "scale(1)" },
            config: { duration: 100 },
        });

        return transition(
            (style, item) =>
                item && (
                    <div className="relative">
                        <animated.div style={style} className={className} {...otherProps}>
                            <Component {...props} />
                        </animated.div>
                    </div>
                )
        );
    };

    ComponentWithPopup.displayName = `WithPopup(${Component.displayName || Component.name})`;

    return ComponentWithPopup;
};

export default withPopup;
