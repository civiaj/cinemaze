import { ErrorBoundary } from "app/error";
import "app/index.css";
import { PersistProvider } from "app/persist/PersistProvider.tsx";
import { ProgressProvider } from "app/progress";
import { StoreProvider } from "app/store/StoreProvider.tsx";
import { ThemeProvider } from "app/theme/index.ts";
import { ToasterProvider } from "app/toaster";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "shared/i18n/config.ts";
import App from "./app/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <PersistProvider>
                <StoreProvider>
                    <ProgressProvider>
                        <ThemeProvider>
                            <BrowserRouter>
                                <ToasterProvider />
                                <App />
                            </BrowserRouter>
                        </ThemeProvider>
                    </ProgressProvider>
                </StoreProvider>
            </PersistProvider>
        </ErrorBoundary>
    </React.StrictMode>
);
