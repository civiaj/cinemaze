import { TRoles } from "@/entities/User";

export const roleOptions: OptionType<TRoles, string>[] = [
    { label: "user", value: "user" },
    { label: "admin-test", value: "admin-test" },
    { label: "admin", value: "admin" },
];
