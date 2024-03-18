import { AppRouter } from "app/router/AppRouter";
import { useAppSelector } from "app/store";
import { getIsLogged, useGetMeQuery } from "entities/User";
import { Suspense } from "react";

import { ID_MAIN } from "shared/const/const";
import { FullscreenSpinner } from "shared/ui/Spinner/FullscreenSpinner";

import { CleanInfinite } from "widgets/CleanInfinite/CleanInfinite";
import { Navbar } from "widgets/Navbar";
import { ProgressBar } from "widgets/ProgressBar";
import { Sidebar } from "widgets/Sidebar";

function App() {
    const isLogged = useAppSelector(getIsLogged);
    const { isLoading } = useGetMeQuery("withoutError", {
        skip: !isLogged,
    });

    if (isLoading) return <FullscreenSpinner className="bg-neutral-50 dark:bg-neutral-950" />;

    return (
        <Suspense>
            <div
                className="text-my-neutral-800 bg-my-neutral-50 font-normal font-custom antialiased h-full w-full min-h-[100svh]"
                id={ID_MAIN}
            >
                <Navbar />

                <div className="relative">
                    <ProgressBar />
                    <Sidebar />
                </div>

                <AppRouter />
                <CleanInfinite />
            </div>
        </Suspense>
    );
}

export default App;
