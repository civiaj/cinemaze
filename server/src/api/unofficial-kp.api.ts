import axios from "axios";
import { KP_UNOFF_KEY } from "../config";

export const unofficialKinopoiskApi = axios.create({
    baseURL: "https://kinopoiskapiunofficial.tech/api",
    headers: {
        "X-API-KEY": KP_UNOFF_KEY,
        "Content-Type": "application/json",
    },
});
