import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import {
    filmConfig,
    managePagePersistConfig,
    persistConfig,
    persistConfigKeys,
    searchPagePersistConfig,
    statisticsPagePersistConfig,
    uiConfig,
} from "@/app/persist/config";
import { storeErrors } from "@/app/store/storeErrors";
import { manageReducer } from "@/pages/ManagePage";
import { searchPageReducer } from "@/pages/SearchPage";
import { statisticsReducer } from "@/pages/StatisticsPage";
import { authAndUserSliceReducer } from "@/features/LoadingAuthorizationAndUser";
import { filmReducer } from "@/entities/Film";
import { uiReducer } from "@/entities/Ui";
import { userReducer } from "@/entities/User";
import { api } from "@/shared/api/api";
import { DispatchFunc, RootState } from "./types";

const appReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    user: userReducer,
    authAndUserIsLoading: authAndUserSliceReducer,
    ui: persistReducer(uiConfig, uiReducer),
    searchPage: persistReducer(searchPagePersistConfig, searchPageReducer),
    statisticsPage: persistReducer(statisticsPagePersistConfig, statisticsReducer),
    manage: persistReducer(managePagePersistConfig, manageReducer),
    film: persistReducer(filmConfig, filmReducer),
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
        }).prepend(api.middleware, storeErrors),
});

export const persistor = persistStore(store);
export default store;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
