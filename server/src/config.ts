import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV as "production" | "development";
export const PORT = Number(process.env.PORT as string) || 3000;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD as string;
export const MONGO_URL = (process.env.MONGO_URL as string).replace("<password>", MONGO_PASSWORD);
export const JWT_ACCESS_PUBLIC_KEY = (process.env.JWT_ACCESS_PUBLIC_KEY as string).replace(
    /\\n/g,
    "\n"
);
export const JWT_ACCESS_PRIVATE_KEY = (process.env.JWT_ACCESS_PRIVATE_KEY as string).replace(
    /\\n/g,
    "\n"
);
export const JWT_REFRESH_PUBLIC_KEY = (process.env.JWT_REFRESH_PUBLIC_KEY as string).replace(
    /\\n/g,
    "\n"
);
export const JWT_REFRESH_PRIVATE_KEY = (process.env.JWT_REFRESH_PRIVATE_KEY as string).replace(
    /\\n/g,
    "\n"
);
export const JWT_ACCESS_TTL = 900000;
export const JWT_REFRESH_TTL = 2592000000;
export const SMTP_HOST = process.env.SMTP_HOST as string;
export const SMTP_PORT = Number(process.env.SMTP_PORT as string);
export const SMTP_USER = process.env.SMTP_USER as string;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD as string;
export const API_URL = `http://localhost:${PORT}`;
export const CLIENT_URL = process.env.CLIENT_URL as string;
export const BCRYPT_SALT_ROUNDS = 10;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
export const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL as string;

export const STATIC_PROFILE_PATH = "/static/profiles/";
export const STATIC_PROFILE_ROUTE = "/api/static/profiles/";
export const STATIC_PROFILE_NEW = API_URL + STATIC_PROFILE_ROUTE;
export const STATIC_PROFILE_DEFAULT = API_URL + STATIC_PROFILE_ROUTE + "default-user.jpeg";
export const ADMINS = ["shlenskiyevgeniy@gmail.com", "evgeniyrabotyaga@gmail.com"];
export const BASE_DOMAIN = process.env.BASE_DOMAIN as string;
