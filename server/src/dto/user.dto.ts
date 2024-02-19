import { Types } from "mongoose";

export default class UserDto {
    displayName: string;
    email: string;
    id: Types.ObjectId | string;

    constructor() {}
}
