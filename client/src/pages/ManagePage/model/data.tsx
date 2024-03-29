import { GetAllUsersFilter } from "pages/ManagePage/model/types";

export const getAllUsersFilterOptions: (OptionType<GetAllUsersFilter, string> & {
    className: string;
})[] = [
    { label: "Name", value: "displayName", className: "" },
    { label: "Verified", value: "verified", className: "" },
    { label: "Banned", value: "isBanned", className: "" },
    { label: "Email", value: "email", className: "hidden mdb:table-cell" },
    { label: "Role", value: "role", className: "" },
    { label: "UpadetAt", value: "updatedAt", className: "hidden appcontainer:table-cell" },
    {
        label: "CreatedAt",
        value: "createdAt",

        className: "hidden appcontainer:table-cell",
    },
];
