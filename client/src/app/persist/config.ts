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

export const searchPagePersistConfig = {
    key: "searchPage",
    storage,
    whitelist: ["userQueries"],
};

export const statisticsPagePersistConfig = {
    key: "statisticsPage",
    storage,
};

export const managePagePersistConfig = {
    key: "manage",
    storage,
    whitelist: ["order", "filter"],
};

export const filmConfig = {
    key: "film",
    storage,
    whitelist: ["query"],
};

// add all keys here to remove from local storage after logout
export const persistConfigKeys = [
    persistConfig,
    uiConfig,
    searchPagePersistConfig,
    statisticsPagePersistConfig,
    managePagePersistConfig,
].map((config) => config.key);
