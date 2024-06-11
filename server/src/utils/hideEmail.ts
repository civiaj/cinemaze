export const hideEmail = (email: string) => {
    return email.slice(0, 2) + "*".repeat(10) + email.slice(-1);
};
