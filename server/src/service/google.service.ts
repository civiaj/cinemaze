import axios from "axios";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL } from "../config";

type GoogleOauthToken = {
    access_token: string;
    id_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    scope: string;
};

interface GoogleUser {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

class GoogleService {
    async getTokens(code: string) {
        const root = "https://oauth2.googleapis.com/token";
        const options = {
            code,
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            redirect_uri: GOOGLE_REDIRECT_URL,
            grant_type: "authorization_code",
        };

        const qs = new URLSearchParams(options);

        const response = await axios.post<GoogleOauthToken>(root, qs, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        return response.data;
    }

    async getUser({ access_token, id_token }: { access_token: string; id_token: string }) {
        const response = await axios.get<GoogleUser>(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            }
        );

        return response.data;
    }
}

export default new GoogleService();
