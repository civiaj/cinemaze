import { TRoles } from "@/entities/User";

export interface IRoute {
    path: string;
    element: JSX.Element;
    auth: boolean;
    label: string;
    allowedRoles: TRoles[];
}
