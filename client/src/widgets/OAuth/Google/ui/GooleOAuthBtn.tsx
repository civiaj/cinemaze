import { Google } from "shared/assets/icons";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Text } from "shared/ui/Text/Text";
import { getGoogleOAuthUrl } from "../helper/getGoogleOAuthUrl";

const url = getGoogleOAuthUrl();

export const GoogleOAuthBtn = () => {
    return (
        <AppLink theme="button" className="h-10 p-0 gap-2" to={url}>
            <Google />
            <Text>Google</Text>
        </AppLink>
    );
};
