import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";

import {
    mainPagePersistConfig,
    persistConfig,
    searchPagePersistConfig,
    favoritePagePersistConfig,
} from "app/persist/config";
import { uiReducer } from "entities/Ui";
import { mainPageReducer } from "pages/MainPage";
import { searchPageReducer } from "pages/SearchPage";
import { favoritePageReducer } from "pages/FavoritePage";
import { DispatchFunc, RootState } from "./types";
import persistStore from "redux-persist/es/persistStore";
import { userReducer } from "entities/User";
import { filmApi } from "shared/api/filmApi";
import { serverApi } from "shared/api/serverApi";
import { storeErrors } from "app/store/storeErrors";
import { authAndUserSliceReducer } from "entities/AuthAndUser";

const rootReducer = combineReducers({
    ui: uiReducer,
    user: userReducer,
    mainPage: persistReducer(mainPagePersistConfig, mainPageReducer),
    favoritePage: persistReducer(favoritePagePersistConfig, favoritePageReducer),
    searchPage: persistReducer(searchPagePersistConfig, searchPageReducer),
    authAndUserIsLoading: authAndUserSliceReducer,
    [filmApi.reducerPath]: filmApi.reducer,
    [serverApi.reducerPath]: serverApi.reducer,
});

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
