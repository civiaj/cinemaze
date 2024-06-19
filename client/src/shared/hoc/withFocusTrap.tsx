import { ComponentType, useRef, useEffect, MutableRefObject } from "react";

const focusable = 'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';

const withFocusTrap = <P extends object>(
    WrappedComponent: ComponentType<P>,
    withFocusProps: { customNode?: HTMLElement } = {}
) => {
    const ComponentWithFocusTrap = (props: P & JSX.IntrinsicAttributes) => {
        const { customNode } = withFocusProps;
        const nodeRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
        const firstNode: MutableRefObject<HTMLElement | null> = useRef(null);
        const lastNode: MutableRefObject<HTMLElement | null> = useRef(null);

        useEffect(() => {
            const node = customNode ?? nodeRef.current;
            const focusables = node?.querySelectorAll(focusable);

            if (focusables && focusables.length > 0) {
                firstNode.current = focusables[0] as HTMLElement;
                lastNode.current = focusables[focusables.length - 1] as HTMLElement;
                firstNode.current.focus();
            }

            const handleKeyDown = (e: KeyboardEvent) => {
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
            <div ref={nodeRef} className="w-full">
                <WrappedComponent {...(props as P)} />
            </div>
        );
    };

    return ComponentWithFocusTrap;
};

export default withFocusTrap;
