import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV as string;
export const PORT = Number(process.env.PORT as string) || 3001;
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
export const CLIENT_URL = `http://localhost:5173`;
export const BCRYPT_SALT_ROUNDS = 10;
export const EMAIL_FROM = "Rest Api Test";
export const DEFAULT_USER_PHOTO = "default-user.jpeg";
