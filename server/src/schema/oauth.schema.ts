import { TypeOf, object, string } from "zod";

const googleOAuthSchema = object({
    query: object({
        code: string(),
        authuser: string(),
        prompt: string(),
        scope: string(),
    }),
});

export type GoogleOAuthInput = TypeOf<typeof googleOAuthSchema>["query"];
