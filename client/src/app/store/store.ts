import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";

import {
    favoritePagePersistConfig,
    mainPagePersistConfig,
    managePagePersistConfig,
    persistConfig,
    persistConfigKeys,
    searchPagePersistConfig,
    statisticsPagePersistConfig,
    uiConfig,
} from "app/persist/config";
import { storeErrors } from "app/store/storeErrors";
import { authAndUserSliceReducer } from "entities/AuthAndUser";
import { uiReducer } from "entities/Ui";
import { userReducer } from "entities/User";
import { favoritePageReducer } from "pages/FavoritePage";
import { mainPageReducer } from "pages/MainPage";
import { searchPageReducer } from "pages/SearchPage";
import { statisticsReducer } from "pages/StatisticsPage/model/slice";
import persistStore from "redux-persist/es/persistStore";
import { filmApi } from "shared/api/filmApi";
import { serverApi } from "shared/api/serverApi";
import { DispatchFunc, RootState } from "./types";
import storage from "redux-persist/lib/storage";
import { manageReducer } from "pages/ManagePage";

const appReducer = combineReducers({
    user: userReducer,
    authAndUserIsLoading: authAndUserSliceReducer,
    ui: persistReducer(uiConfig, uiReducer),
    mainPage: persistReducer(mainPagePersistConfig, mainPageReducer),
    favoritePage: persistReducer(favoritePagePersistConfig, favoritePageReducer),
    searchPage: persistReducer(searchPagePersistConfig, searchPageReducer),
    statisticsPage: persistReducer(statisticsPagePersistConfig, statisticsReducer),
    manage: persistReducer(managePagePersistConfig, manageReducer),
    [filmApi.reducerPath]: filmApi.reducer,
    [serverApi.reducerPath]: serverApi.reducer,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
    if (action.type === "userSlice/logout") {
        persistConfigKeys.forEach((configKey) => storage.removeItem(`persist:${configKey}`));

        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(filmApi.middleware, serverApi.middleware, storeErrors),
});

export const persistor = persistStore(store);
export default store;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
