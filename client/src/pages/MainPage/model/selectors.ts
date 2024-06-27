import { RootState } from "@/app/store";
import { adapter } from "./slice";

export const getMainQuery = (state: RootState) => state.mainPage.query;
export const getMainPage = (state: RootState) => state.mainPage.page;

const adapterSelectors = adapter.getSelectors<RootState>((state) => state.mainPage.films);

export const getMainFilms = (state: RootState) => adapterSelectors.selectAll(state);
