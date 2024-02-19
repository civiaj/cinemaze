export type ServerError = { data: { message: string; errors: string[] }; status: number };

export const isServerError = (error: unknown): error is ServerError => {
    return (
        typeof error === "object" &&
        error != null &&
        "data" in error &&
        typeof error.data === "object" &&
        error.data != null &&
        "message" in error.data &&
        typeof error.data.message === "string" &&
        "errors" in error.data &&
        Array.isArray(error.data.errors)
    );
};

export default (error: unknown) => {
    if (isServerError(error) && error.data.errors.length) {
        return new Intl.ListFormat("ru", { style: "short" }).format(
            error.data.errors.map((err, index) => (index ? err.toLowerCase() : err))
        );
    }
    if (isServerError(error) && error.data.message) return error.data.message;

    return "Ошибка сервера";
};
