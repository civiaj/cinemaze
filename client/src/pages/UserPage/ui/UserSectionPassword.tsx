import { useState } from "react";
import { NewPasswordForm } from "@/pages/UserPage/ui/NewPasswordForm";
import { CheckPassword } from "./CheckPassword";

type Props = {
    onClose: () => void;
    email: string;
};

export const UserSectionPassword = (props: Props) => {
    const [isChecked, setIsChecked] = useState(false);
    const onSetChecked = () => setIsChecked(true);

    return !isChecked ? (
        <CheckPassword onSetChecked={onSetChecked} {...props} />
    ) : (
        <NewPasswordForm {...props} />
    );
};
