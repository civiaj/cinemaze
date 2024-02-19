export default class ApiError extends Error {
    constructor(message: string, public status: number, public errors: any[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static Unauthorized(message: string = "Необходима авторизация", errors?: string[]) {
        return new ApiError(message, 401, errors);
    }

    static BadRequest(message: string = "Неверный запрос", errors?: any[]) {
        return new ApiError(message, 400, errors);
    }

    static NotAllowed(message: string = "Нет доступа", errors?: any[]) {
        return new ApiError(message, 403, errors);
    }

    static MailError(errors?: any[]) {
        return new ApiError("Возникла ошибка при отправке письма.", 500, errors);
    }

    static MongooseError(errors?: any[]) {
        return new ApiError("Возникла ошибка при обращению к базе данных.", 500, errors);
    }
}
