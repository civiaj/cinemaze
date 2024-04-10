import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ProgressBarFallback } from "@/widgets/ProgressBar";
import { RequireAuth } from "@/entities/Authorization";
import { routeConfig } from "./router";
import { IRoute } from "./types";

export const AppRouter = () => {
    const renderRoutes = (route: IRoute) => {
        const element = <Suspense fallback={<ProgressBarFallback />}>{route.element}</Suspense>;
        return (
            <Route
                path={route.path}
                key={route.path}
                element={
                    route.auth ? (
                        <RequireAuth allowedRoles={route.allowedRoles}>{element}</RequireAuth>
                    ) : (
                        element
                    )
                }
            />
        );
    };

    return <Routes>{Object.values(routeConfig).map(renderRoutes)}</Routes>;
};
