import {
    GetAllUsersData,
    GetAllUsersQuery,
    GetAllUsersResponse,
} from "pages/ManagePage/model/types";
import { serverApi } from "shared/api/serverApi";

const manageApi = serverApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getUsers: builder.query<GetAllUsersData, GetAllUsersQuery>({
            query: (params) => ({
                url: `/manage/users`,
                credentials: "include",
                params,
            }),
            transformResponse: (response: GetAllUsersResponse) => response.data,
            providesTags: ["Manage"],
        }),
    }),
});

export const { useGetUsersQuery } = manageApi;
