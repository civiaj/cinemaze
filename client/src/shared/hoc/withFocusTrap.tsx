import { ComponentType, useRef, useEffect, MutableRefObject } from "react";
import { classNames } from "@/shared/lib/classNames";

const focusable = "a, button, input, textarea, select, details";

const withFocusTrap = <P extends object>(
    WrappedComponent: ComponentType<P>,
    withFocusProps: { customNode?: HTMLElement; className?: string } = {}
) => {
    const ComponentWithFocusTrap = (props: P & JSX.IntrinsicAttributes) => {
        const { customNode, className } = withFocusProps;
        const nodeRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
        const firstNode: MutableRefObject<HTMLElement | null> = useRef(null);
        const lastNode: MutableRefObject<HTMLElement | null> = useRef(null);

        useEffect(() => {
            const node = customNode ?? nodeRef.current;
            const focusables = Array.from(node?.querySelectorAll(focusable) ?? []).filter(
                (el) => el.getAttribute("tabindex") !== "-1"
            );

            console.log("INIT", { focusables });

            if (focusables && focusables.length > 0) {
                firstNode.current = focusables[0] as HTMLElement;
                lastNode.current = focusables[focusables.length - 1] as HTMLElement;
                firstNode.current.focus();
            }

            const handleKeyDown = (e: KeyboardEvent) => {
                console.log({ focusables });
                if (e.key === "Tab") {
                    if (e.shiftKey) {
                        if (document.activeElement === firstNode.current) {
                            e.preventDefault();
                            lastNode.current?.focus();
                        }
                    } else {
                        if (document.activeElement === lastNode.current) {
                            e.preventDefault();
                            firstNode.current?.focus();
                        }
                    }
                }
            };

            node?.addEventListener("keydown", handleKeyDown);

            return () => {
                node?.removeEventListener("keydown", handleKeyDown);
            };
        }, [customNode]);

        return (
            <div id="focus-trap" ref={nodeRef} className={classNames("w-full", {}, [className])}>
                <WrappedComponent {...(props as P)} />
            </div>
        );
    };

    return ComponentWithFocusTrap;
};

export default withFocusTrap;
