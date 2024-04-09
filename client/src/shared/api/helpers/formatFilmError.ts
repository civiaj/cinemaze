import i18n from "shared/i18n/config";

export type FilmError = { data: { message: string }; status: number };

export const isFilmError = (error: unknown): error is FilmError => {
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
    if (isFilmError(error)) return error.data.message;
    return i18n.t("api.default-error");
};
