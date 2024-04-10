import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useAppSelector } from "@/app/store";
import { Page } from "@/entities/Ui";
import { selectUser } from "@/entities/User";
import { TUserSection } from "@/pages/UserPage/model/types";
import { UserSectionDevices } from "@/pages/UserPage/ui/UserSectionDevices";
import { UserSectionHome } from "@/pages/UserPage/ui/UserSectionHome";
import { UserSectionName } from "@/pages/UserPage/ui/UserSectionName";
import { UserSectionPassword } from "@/pages/UserPage/ui/UserSectionPassword";
import { UserSectionPhoto } from "@/pages/UserPage/ui/UserSectionPhoto/UserSectionPhoto";
import { UserSectionRole } from "@/pages/UserPage/ui/UserSectionRole";

const UserPage = () => {
    const [searchParams] = useSearchParams();
    const section: null | string | TUserSection = searchParams.get("section");
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const onClose = () => navigate(routePath.user);

    if (!user) return <Navigate to={routePath.login} replace />;

    return (
        <Page>
            {(!section ||
                section.startsWith("password") ||
                section.startsWith("photo") ||
                section.startsWith("name") ||
                section.startsWith("role")) && <UserSectionHome user={user} />}

            {section?.startsWith("photo") && (
                <UserSectionPhoto onClose={onClose} photo={user.photo} />
            )}
            {section?.startsWith("name") && (
                <UserSectionName onClose={onClose} name={user.displayName} />
            )}
            {section?.startsWith("devices") && <UserSectionDevices />}
            {section?.startsWith("password") && user.provider === "local" && (
                <UserSectionPassword
                    name={user.displayName}
                    photo={user.photo}
                    email={user.email}
                    onClose={onClose}
                />
            )}
            {section?.startsWith("role") && <UserSectionRole onClose={onClose} role={user.role} />}
        </Page>
    );
};

export default UserPage;
