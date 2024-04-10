import { useTransition, animated } from "@react-spring/web";
import { OutsideClickWrapper } from "@/shared/ui/Boxes/OutsideClickWrapper";

type Props = {
    transitionValue: string | number | boolean | null;
    className?: string;
    onCloseModal: () => void;
};

export const UserModalAnimationHoc = <T,>(Component: React.ComponentType<T>, props: Props) => {
    const { transitionValue, onCloseModal } = props;

    const UserModalWithAnimation = (props: T & JSX.IntrinsicAttributes) => {
        const transition = useTransition(transitionValue, {
            from: { opacity: 0, transform: "translateY(100%)" },
            enter: { opacity: 1, transform: "translateY(0)" },
            config: {
                duration: 200,
            },
        });

        return transition(
            (style, item) =>
                item && (
                    <div className="dark:bg-neutral-950/80 bg-neutral-900/80 w-full h-full z-10 absolute top-0 left-0">
                        <OutsideClickWrapper
                            className="absolute bottom-0 left-0 w-full"
                            onClose={onCloseModal}
                        >
                            <animated.div style={style} className={"w-full"}>
                                <Component {...props} />
                            </animated.div>
                        </OutsideClickWrapper>
                    </div>
                )
        );
    };

    UserModalWithAnimation.displayName = `WithPopup(${Component.displayName || Component.name})`;

    return UserModalWithAnimation;
};
