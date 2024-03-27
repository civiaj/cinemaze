import { Middleware, MiddlewareAPI, isRejectedWithValue } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import formatFilmError, { isFilmError } from "shared/api/helpers/formatFilmError";
import formatServerError, { isServerError } from "shared/api/helpers/formatServerError";

export const storeErrors: Middleware = (_api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        console.error("ERROR MIDDLEWARE", action);
        let message = "Неизвестная ошибка";

        if (action.payload.data === "withoutError") {
            return next(action);
        }

        if (isServerError(action.payload)) {
            message = formatServerError(action.payload);
        }

        if (isFilmError(action.payload)) {
            message = formatFilmError(action.payload);
        }

        if (action.payload && action.payload.status && action.payload.status === "FETCH_ERROR") {
            message = "Невозможно подключиться к серверу";
        }

        toast.error(message, { id: message });
    }

    return next(action);
};
