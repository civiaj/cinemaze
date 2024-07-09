import { ReactNode } from "react";
import { AppRoutes } from "@/app/router/router";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { getRoute } from "../model/selectors";
import { filmActions } from "../model/slice";

type Props = {
    currentRoute: AppRoutes;
    children: ReactNode;
};

export const RouteBasedFilmManager = ({ children, currentRoute }: Props) => {
    const route = useAppSelector(getRoute);
    const dispatch = useAppDispatch();

    if (currentRoute !== route) {
        dispatch(filmActions.setRoute(currentRoute));
        return null;
    }

    return children;
};
