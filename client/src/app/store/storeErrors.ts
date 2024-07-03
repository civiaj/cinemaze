import { Middleware, MiddlewareAPI, isRejectedWithValue } from "@reduxjs/toolkit";
import { t } from "i18next";
import toast from "react-hot-toast";
import formatServerError, { isServerError } from "@/shared/api/helpers/formatServerError";

export const storeErrors: Middleware = (_api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        let message = t("toast.error-default");

        if (isServerError(action.payload)) {
            message = formatServerError(action.payload);
        } else if (
            action.payload &&
            action.payload.status &&
            action.payload.status === "FETCH_ERROR"
        ) {
            message = t("toast.error-fetch");
        }

        if (action.payload?.toast === true) {
            toast.error(message, { id: message });
        }
    }

    return next(action);
};
