import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
    body: object({
        email: string().email("Неверный адрес почты"),
        displayName: string()
            .transform((value) => value.replace(/\s+/g, " "))
            .pipe(string().trim().min(3, "Минимальная длина имени 3 символа")),
        password: string()
            .transform((value) => value.replaceAll(" ", ""))
            .pipe(
                string()
                    .trim()
                    .min(8, "Минимальная длина пароля 8 символов")
                    .max(32, "Максимальная длина пароля 32 символа")
            ),

        confirmPassword: string().trim().min(1, "Необходимо заполнить подтверждение пароля"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Пароли не совпадают",
        path: ["passwordConfirm"],
    }),
});

export const loginUserSchema = object({
    body: object({
        email: string().trim().min(1, "Необходимо заполнить адрес электронной почты"),
        password: string().trim().min(1, "Необходимо заполнить пароль"),
    }),
});

export const verifyEmailSchema = object({
    params: object({
        verificationCode: string(),
    }),
});

export const displayNameSchema = object({
    body: object({
        displayName: string().trim().min(3, "Минимальная длина имени 3 символа"),
    }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>["params"];
export type DisplayNameInput = TypeOf<typeof displayNameSchema>["body"];
