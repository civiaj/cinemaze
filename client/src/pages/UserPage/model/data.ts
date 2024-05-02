import { TRoles } from "@/entities/User";

export const roleOptions: OptionType<TRoles, string>[] = [
    { label: "user-role", value: "user" },
    { label: "admin-test-role", value: "admin-test" },
    { label: "admin-role", value: "admin" },
];
