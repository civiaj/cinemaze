import { TypeOf, object, string, z } from "zod";
import { roles } from "../types/types";

export const displayNameSchema = z
    .string()
    .transform((value) => value.trim().replace(/\s+/g, " "))
    .pipe(
        string()
            .trim()
            .min(4, "Минимальная длина имени 4 символа")
            .max(30, "Максимальная длина имени 30 символов")
    );

export const passwordSchema = string()
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
        displayName: displayNameSchema,
        password: passwordSchema,
        confirmPassword: string().trim().min(1, "Необходимо заполнить подтверждение пароля"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Пароли не совпадают",
        path: ["passwordConfirm"],
    }),
});

export const loginUserSchema = object({
    body: object({
        email,
        password: passwordSchema,
    }),
});

export const emailSchema = object({
    body: object({
        email,
    }),
});

export const checkPasswordSchema = object({
    body: object({
        password: passwordSchema,
    }),
});

export const resetPasswordSchema = object({
    body: object({
        password: passwordSchema,
        confirmPassword: string().trim().min(1, "Необходимо заполнить подтверждение пароля"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Пароли не совпадают",
        path: ["passwordConfirm"],
    }),
    params: object({
        resetToken: string(),
    }),
});

export const verifyEmailSchema = object({
    params: object({
        verificationCode: string(),
    }),
});

export const setDisplayNameSchema = object({
    body: object({
        displayName: displayNameSchema,
    }),
});

export const setPasswordSchema = object({
    body: object({
        password: passwordSchema,
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

export const updateRoleSchema = object({
    body: object({
        role: z.enum(roles, {
            required_error: "параметр role обязателен",
            invalid_type_error: "неверно указан role",
        }),
    }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>["params"];
export type DisplayNameInput = TypeOf<typeof setDisplayNameSchema>["body"];
export type RemoveSessionInput = TypeOf<typeof removeSessionSchema>["body"];
export type UpdatePasswordInput = TypeOf<typeof setPasswordSchema>["body"];
export type EmailInput = TypeOf<typeof emailSchema>["body"];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
export type UpdateRolesInput = TypeOf<typeof updateRoleSchema>["body"];
export type CheckPasswordInput = TypeOf<typeof checkPasswordSchema>["body"];
