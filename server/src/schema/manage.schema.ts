import { TypeOf, boolean, object, string, z } from "zod";
import { displayNameSchema } from "./user.schema";
import { locales } from "../types/types";

const filters = [
    "displayName",
    "email",
    "updatedAt",
    "createdAt",
    "role",
    "verified",
    "isBanned",
] as const;

const roles = ["user", "admin", "admin-test"] as const;

export const getOneUserSchema = object({
    params: object({
        userId: string({ required_error: "параметр userId обязателен" }),
    }),
});

export const getAllUsersSchema = object({
    query: object({
        page: z.string({ required_error: "параметр page обязателен" }),
        query: string().optional(),
        order: z.enum(["-1", "1"]),
        filter: z.enum(filters).optional().default("displayName"),
        locale: z.enum(locales, {
            invalid_type_error: "неподдерживаемый параметр locale",
            required_error: "параметр locale обязателен",
        }),
    }),
});

export const manageUserChangeSchema = object({
    body: object({
        role: z.enum(roles, {
            required_error: "параметр role обязателен",
            invalid_type_error: "неверно указан role",
        }),
        displayName: displayNameSchema,
        deletePhoto: boolean({
            required_error: "параметр deletePhoto обязателен",
            invalid_type_error: "неверно указан deletePhoto",
        }),
        manageUserId: z.string({
            required_error: "параметр manageUserId обязателен",
            invalid_type_error: "неверно указан manageUserId",
        }),
    }),
});

export const mangeUserBanSchema = object({
    body: object({
        banExpiration: z.string({
            required_error: "параметр banExpiration обязателен",
            invalid_type_error: "неверно указан banExpiration",
        }),
        banMessage: z
            .string({ invalid_type_error: "неверно указан banMessage" })
            .max(300, "максимальная длина сообщения 300 символов"),
        manageUserId: z.string({
            required_error: "параметр manageUserId обязателен",
            invalid_type_error: "неверно указан manageUserId",
        }),
    }),
});

export type GetOneUserInput = TypeOf<typeof getOneUserSchema>["params"];
export type GetAllUsersInput = TypeOf<typeof getAllUsersSchema>["query"];
export type ManageUserChangeInput = TypeOf<typeof manageUserChangeSchema>["body"];
export type ManageUserBanInput = TypeOf<typeof mangeUserBanSchema>["body"];
