import { Middleware, MiddlewareAPI, isRejectedWithValue } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import formatFilmError, { isFilmError } from "@/shared/api/helpers/formatFilmError";
import formatServerError, { isServerError } from "@/shared/api/helpers/formatServerError";

export const storeErrors: Middleware = (_api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        let message = "toast.error-default";

        if (isServerError(action.payload)) {
            message = formatServerError(action.payload);
        }

        if (isFilmError(action.payload)) {
            message = formatFilmError(action.payload);
        }

        if (action.payload && action.payload.status && action.payload.status === "FETCH_ERROR") {
            message = "toast.error-fetch";
        }

        if (action.payload?.toast === true) {
            toast.error(message, { id: message });
        }
    }

    return next(action);
};
