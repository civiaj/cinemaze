import { useRef } from "react";
import { AppRouter } from "@/app/router/AppRouter";
import { useAppSelector } from "@/app/store";
import { LoginPopup } from "@/widgets/LoginPopup";
import { Navbar } from "@/widgets/Navbar";
import { ProgressBar } from "@/widgets/ProgressBar";
import { Sidebar } from "@/widgets/Sidebar";
import { SidebarMobile } from "@/widgets/Sidebar/ui/SidebarMobile";
import { MobileObserver } from "@/entities/Ui";
import { getIsLogged, useGetMeQuery } from "@/entities/User";
import { ID_MAIN } from "@/shared/const/const";
import { FullscreenSpinner } from "@/shared/ui/Spinner/FullscreenSpinner";

function App() {
    const isLogged = useAppSelector(getIsLogged);
    const ref = useRef(null);
    const { isLoading } = useGetMeQuery(undefined, {
        skip: !isLogged,
    });

    if (isLoading) return <FullscreenSpinner className="bg-neutral-50 dark:bg-neutral-950" />;

    return (
        <>
            <div
                ref={ref}
                className="text-my-neutral-800 bg-my-neutral-50 font-normal font-custom antialiased h-full w-full min-h-[100dvh]"
                id={ID_MAIN}
            >
                <Navbar />
                <div className="relative">
                    <ProgressBar />
                    <Sidebar />
                    <SidebarMobile />
                </div>
                <AppRouter />
                <MobileObserver ref={ref} />

                {!isLogged && <LoginPopup />}
            </div>
        </>
    );
}

export default App;
