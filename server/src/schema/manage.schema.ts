import { TypeOf, number, object, string, z } from "zod";

const filters = ["displayName", "email", "updatedAt", "createdAt", "role", "verified"] as const;

export const getAllUsersSchema = object({
    query: object({
        page: z.string({ required_error: "Параметр page обязателен" }),
        query: string().optional(),
        order: z.enum(["-1", "1"]),
        filter: z.enum(filters).optional().default("displayName"),
    }),
});

export type GetAllUsersInput = TypeOf<typeof getAllUsersSchema>["query"];
