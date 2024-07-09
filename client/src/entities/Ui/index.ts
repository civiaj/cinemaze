export { uiReducer, uiActions } from "./model/slice";
export {
    getScrollByPath,
    getUiAppearance,
    getNavbarAuthPopupIsOpen,
    getSidebarIsOpen,
    allowNavbarScroll,
    getIsMobile,
} from "./model/selectors";

export type { TAppearances, UiSchema, TAppearancesRecord } from "./model/types";
export { APPEARANCES, appearances } from "./model/types";
export { Breadcrumbs } from "./ui/Breadcrumbs/Breadcrumbs";
export { MobileObserver } from "./ui/MobileObserver";
