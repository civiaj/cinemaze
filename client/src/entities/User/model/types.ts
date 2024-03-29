export type TUser = {
    _id: string;
    email: string;
    displayName: string;
    role: string;
    photo: string;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
    id: string;
    isBanned: boolean;
    banExpiration?: string | null;
    banMessage?: string | null;
};

export type SessionIdentifier = { os: string; browser: string; version: string };

export type SessionsResponse = {
    current: SessionIdentifier;
    other: SessionIdentifier[];
};
