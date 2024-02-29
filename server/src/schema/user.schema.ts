import { TypeOf, object, string } from "zod";

const displayName = string()
    .transform((value) => value.replace(/\s+/g, " "))
    .pipe(string().trim().min(3, "Минимальная длина имени 3 символа"));

const password = string()
    .transform((value) => value.replaceAll(" ", ""))
    .pipe(
        string()
            .trim()
            .min(8, "Минимальная длина пароля 8 символов")
            .max(32, "Максимальная длина пароля 32 символа")
    );

const email = string().trim().min(1, "Неверный адрес почты");

export const createUserSchema = object({
    body: object({
        email,
        displayName,
        password,
        confirmPassword: string().trim().min(1, "Необходимо заполнить подтверждение пароля"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Пароли не совпадают",
        path: ["passwordConfirm"],
    }),
});

export const loginUserSchema = object({
    body: object({
        email,
        password,
    }),
});

export const verifyEmailSchema = object({
    params: object({
        verificationCode: string(),
    }),
});

export const displayNameSchema = object({
    body: object({
        displayName,
    }),
});

export const passwordSchema = object({
    body: object({
        password,
        confirmPassword: string().trim().min(1, "Необходимо заполнить"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Пароли не совпадают",
        path: ["passwordConfirm"],
    }),
});

export const removeSessionSchema = object({
    body: object({
        session: string().trim().min(3, "Минимальная длина сессии 3 символа"),
    }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>["params"];
export type DisplayNameInput = TypeOf<typeof displayNameSchema>["body"];
export type RemoveSessionInput = TypeOf<typeof removeSessionSchema>["body"];
export type UpdatePasswordInput = TypeOf<typeof passwordSchema>["body"];
