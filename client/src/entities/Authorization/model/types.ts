export type GenericResponse = {
    message: string;
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
