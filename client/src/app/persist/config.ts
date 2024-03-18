import storage from "redux-persist/lib/storage";

export const persistConfig = {
    key: "appstorage",
    storage,
    whitelist: [],
};

export const uiConfig = {
    key: "ui",
    storage,
    whitelist: ["sb", "appearance", "breadcrumbs"],
    blaclist: ["na"],
};

export const mainPagePersistConfig = {
    key: "mainPage",
    storage,
    whitelist: ["mainQuery"],
};

export const favoritePagePersistConfig = {
    key: "favoritePage",
    storage,
    whitelist: ["listVariant"],
};

export const searchPagePersistConfig = {
    key: "searchPage",
    storage,
    whitelist: ["userQueries"],
};

export const statisticsPagePersistConfig = {
    key: "statisticsPage",
    storage,
};

// add all keys here to remove from local storage after logout
export const persistConfigKeys = [
    "appstorage",
    "ui",
    "mainPage",
    "favoritePage",
    "searchPage",
    "statisticsPage",
];
