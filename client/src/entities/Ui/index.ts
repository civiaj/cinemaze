export { uiReducer, uiActions } from "./model/slice";
export { getScrollByPath, getUiAppearance, getSidebarCollapsed } from "./model/selectors";

export type { TAppearances, UiSchema, TAppearancesRecord } from "./model/types";
export { APPEARANCES, appearances } from "./model/types";

export { UiAppearanceChange } from "./ui/UiAppearanceChange";
export { PageError } from "./ui/PageError";
export { Page } from "./ui/Page";
