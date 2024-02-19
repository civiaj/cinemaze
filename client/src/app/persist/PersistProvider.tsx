import { persistor } from "app/store/store";
import { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";

export const PersistProvider = ({ children }: { children: ReactNode }) => {
    return (
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    );
};
