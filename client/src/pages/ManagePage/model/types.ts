import { TUser } from "entities/User";

export type GetAllUsersFilter =
    | "displayName"
    | "email"
    | "updatedAt"
    | "createdAt"
    | "role"
    | "verified";

export type GetAllUsersOrder = 1 | -1;

export type GetAllUsersQuery = {
    page: number;
    query?: string;
    order: GetAllUsersOrder;
    filter: GetAllUsersFilter;
};

export type GetAllUserData = Omit<TUser, "_id" | "provider">;

export type GetAllUsersData = {
    users: GetAllUserData[];
    totalPages: number;
};

export type GetAllUsersResponse = {
    data: GetAllUsersData;
};

export type ManageSchema = Omit<GetAllUsersQuery, "page" | "query">;

export type BlockUserData = { date: Date | null; msg: string };
export type ChangeUserData = { displayName: string; role: string; deletePhoto: boolean };
export type ManageAction = "change" | "block" | null;
