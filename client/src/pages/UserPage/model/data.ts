import { TRoles } from "./types";

export const roleOptions: OptionType<TRoles, string>[] = [
    { label: "User", value: "user" },
    { label: "FakeAdmin", value: "fake-admin" },
    { label: "Admin", value: "admin" },
];
