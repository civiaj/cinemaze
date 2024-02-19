export type GenericResponse = {
    message: string;
};

export type TokenResponse = {
    message: string;
    accessToken: string;
};

export type RegisterRequest = {
    email: string;
    password: string;
    confirmPassword: string;
    displayName: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};
