import { Heading } from "shared/ui/Text/Heading";
import { GoogleOAuthBtn } from "widgets/OAuth/Google";

export const OAuthOptions = () => {
    return (
        <div className="flex flex-col gap-2">
            <Heading headinglevel={4} className="font-normal">
                Вход с помощью
            </Heading>
            <div className="flex flex-col gap-2">
                <GoogleOAuthBtn />
            </div>
        </div>
    );
};
