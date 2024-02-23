export { userReducer, userActions } from "./model/slice";
export { userApi, useGetMeQuery, useUpdateDisplayNameMutation } from "./model/userApi";
export { selectUser, getIsLogged } from "./model/selectors";
export type { TUser } from "./model/types";
