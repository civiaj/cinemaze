import { t } from "i18next";
import i18n from "@/shared/i18n/config";

export type ServerError = { data: { message: string; errors: string[] }; status: number };

export const isServerError = (error: unknown): error is ServerError => {
    return (
        typeof error === "object" &&
        error != null &&
        "data" in error &&
        typeof error.data === "object" &&
        error.data != null &&
        "message" in error.data &&
        typeof error.data.message === "string"
    );
};

export default (error: unknown) => {
    if (
        isServerError(error) &&
        "errors" in error.data &&
        Array.isArray(error.data.errors) &&
        error.data.errors.length
    ) {
        return new Intl.ListFormat(i18n.language, { style: "short" }).format(
            error.data.errors.map((err, index) => (index ? err.toLowerCase() : err))
        );
    }

    if (isServerError(error) && error.data.message) return error.data.message;

    return t("toast.error-server-default");
};
