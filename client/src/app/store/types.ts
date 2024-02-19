import store from "./store";

type AppDispatch = typeof store.dispatch;
export type DispatchFunc = () => AppDispatch;
export type RootState = ReturnType<typeof store.getState>;
