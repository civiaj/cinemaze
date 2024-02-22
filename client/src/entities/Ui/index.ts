export { uiReducer, uiActions } from "./model/slice";
export {
    getScrollByPath,
    getUiAppearance,
    getSidebarCollapsed,
    getNavbarAuthCollapsed,
    allowNavbarScroll,
} from "./model/selectors";

export type { TAppearances, UiSchema, TAppearancesRecord } from "./model/types";
export { APPEARANCES, appearances } from "./model/types";

export { PageError } from "./ui/PageError";
export { Page } from "./ui/Page";