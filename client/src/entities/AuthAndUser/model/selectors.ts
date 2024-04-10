import { RootState } from "@/app/store";
export const getAuthAndUserIsLoading = (state: RootState) => state.authAndUserIsLoading.isLoading;
