export const getGoogleOAuthUrl = () => {
    const root = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
        redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT as string,
        response_type: "code",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
        access_type: "offline",
        prompt: "consent",
    };

    const qs = new URLSearchParams(options);

    return `${root}?${qs.toString()}`;
};
