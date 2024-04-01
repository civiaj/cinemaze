import { routePath } from "app/router/router";
import { useAppSelector } from "app/store";
import { getIsLogged, selectUser, useGetMeQuery } from "entities/User";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UnauthorizedMessage } from "widgets/Messages/UnauthorizedMessage";

interface RequireAuthProps {
    children: ReactNode;
    allowedRoles: string[];
}

export const RequireAuth = ({ children, allowedRoles = [] }: RequireAuthProps) => {
    const user = useAppSelector(selectUser);
    const isLogged = useAppSelector(getIsLogged);
    const { pathname } = useLocation();

    const { isError } = useGetMeQuery(undefined, {
        skip: !isLogged,
    });

    if (user) {
        const roleCondition = allowedRoles.includes(user?.role);
        const allowedBannedRoutes = [routePath.favorite, routePath.user].includes(pathname);

        const banCondition = user.isBanned && !allowedBannedRoutes;
        const navigateOnBan = banCondition && pathname !== routePath.ban;

        if (!roleCondition) return <UnauthorizedMessage />;

        if (banCondition && navigateOnBan) return <Navigate to={routePath.ban} replace />;

        if ((roleCondition && !banCondition) || (banCondition && !navigateOnBan)) return children;
    }

    if (!isLogged || isError) return <Navigate to={routePath.login} replace />;
};
