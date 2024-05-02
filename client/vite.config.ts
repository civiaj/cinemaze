import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        exclude: ["react-window"],
    },
    preview: {
        port: 8080,
        strictPort: true,
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        host: true,
        strictPort: true,
        port: 8080,
        // proxy: {
        //     "/api/": {
        //         target: "http://localhost:5001", //server url
        //         changeOrigin: true,
        //         secure: false,
        //     },
        // },
    },
});
