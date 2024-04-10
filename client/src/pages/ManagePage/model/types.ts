import { TUser } from "@/entities/User";
import { TLngs } from "@/shared/i18n/types";

export type GetAllUsersFilter =
    | "displayName"
    | "email"
    | "updatedAt"
    | "createdAt"
    | "role"
    | "verified"
    | "isBanned";

export type GetAllUsersOrder = 1 | -1;

export type GetAllUsersQuery = {
    page: number;
    query?: string;
    order: GetAllUsersOrder;
    filter: GetAllUsersFilter;
    locale: TLngs;
};

export type GetAllUsersData = {
    users: TUser[];
    totalPages: number;
};

export type GetAllUsersResponse = {
    data: GetAllUsersData;
};

export type ManageSchema = Omit<GetAllUsersQuery, "page" | "query">;

export type BlockUserData = { banExpiration: Date; banMessage: string };
export type BlockUserRequest = {
    banExpiration: string;
    banMessage: string;
    displayName: string;
    manageUserId: string;
};

export type ChangeUserData = { displayName: string; role: string; deletePhoto: boolean };
export type ManageActionViews = "update" | "ban" | "info";

export type ManageUpdateOne = ChangeUserData & { manageUserId: string };
export type UnbanUserRequest = {
    id: string;
    displayName: string;
};
