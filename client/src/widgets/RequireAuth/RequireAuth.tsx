import { routePath } from "app/router/router";
import { useAppSelector } from "app/store";
import { getIsLogged, selectUser, useGetMeQuery } from "entities/User";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ProgressBarFallback } from "widgets/ProgressBar";
import { UnauthorizedMessage } from "widgets/RequireAuth/UnauthorizedMessage";

interface RequireAuthProps {
    children: ReactNode;
    allowedRoles: string[];
}

const RequireAuth = ({ children, allowedRoles = [] }: RequireAuthProps) => {
    const user = useAppSelector(selectUser);
    const isLogged = useAppSelector(getIsLogged);

    const { isLoading, isFetching } = useGetMeQuery("withoutError", {
        skip: !isLogged,
    });

    const roleCondition = user && allowedRoles.includes(user.role);

    if (!isLogged) return <Navigate to={routePath.login} replace={true} />;
    if (isLoading || isFetching) return <ProgressBarFallback />;
    if (user && !roleCondition) return <UnauthorizedMessage />;
    if (user && roleCondition) return children;
};

export default RequireAuth;
