export type TUser = {
    _id: string;
    email: string;
    displayName: string;
    role: string;
    photo: string;
    verified: boolean;
    provider: string;
    createdAt: string;
    updatedAt: string;
    id: string;
};

export type SessionIdentifier = { os: string; browser: string; version: string };

export type SessionsResponse = {
    current: SessionIdentifier;
    other: SessionIdentifier[];
};
