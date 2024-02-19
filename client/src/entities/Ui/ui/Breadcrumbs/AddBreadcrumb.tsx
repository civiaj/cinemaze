import { useAppDispatch } from "app/store";
import { uiActions } from "entities/Ui";
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

type Props = {
    children: ReactNode;
    label: string;
};

export const AddBreadcrumb = (props: Props) => {
    const { children, label } = props;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    useEffect(() => {
        dispatch(uiActions.addBreadcrumbs({ label, pathname }));
    }, [label, pathname, dispatch]);

    return children;
};
