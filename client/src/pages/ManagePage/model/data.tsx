import { GetAllUsersFilter } from "@/pages/ManagePage/model/types";

export const getAllUsersFilterOptions: (OptionType<GetAllUsersFilter, string> & {
    className: string;
})[] = [
    { label: "manage.displayName", value: "displayName", className: "" },
    { label: "manage.verified", value: "verified", className: "" },
    { label: "manage.isBanned", value: "isBanned", className: "" },
    { label: "manage.email", value: "email", className: "hidden mdb:table-cell" },
    { label: "manage.role", value: "role", className: "" },
    { label: "manage.updatedAt", value: "updatedAt", className: "hidden appcontainer:table-cell" },
    {
        label: "manage.createdAt",
        value: "createdAt",
        className: "hidden appcontainer:table-cell",
    },
];
