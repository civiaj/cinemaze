import { Suspense, lazy } from "react";
import { FullscreenSpinner } from "shared/ui/Spinner/FullscreenSpinner";

export const LoginPageLazy = () => {
    const Component = lazy(() => import("./LoginPage"));

    return (
        <Suspense fallback={<FullscreenSpinner className="bg-neutral-50 dark:bg-neutral-950" />}>
            <Component />
        </Suspense>
    );
};
