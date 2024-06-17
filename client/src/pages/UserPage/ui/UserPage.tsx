import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useAppSelector } from "@/app/store";
import { UserSectionDelete } from "@/pages/UserPage/ui/UserSectionDelete";
import { Page } from "@/entities/Ui";
import { selectUser } from "@/entities/User";
import { TUserSection } from "../model/types";
import { UserSectionDevices } from "../ui/UserSectionDevices";
import { UserSectionHome } from "../ui/UserSectionHome";
import { UserSectionName } from "../ui/UserSectionName";
import { UserSectionPassword } from "../ui/UserSectionPassword";
import { UserSectionPhoto } from "../ui/UserSectionPhoto/UserSectionPhoto";
import { UserSectionRole } from "../ui/UserSectionRole";

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
                <UserSectionPassword email={user.email} onClose={onClose} />
            )}
            {section?.startsWith("role") && <UserSectionRole onClose={onClose} role={user.role} />}
            {section?.startsWith("delete") && <UserSectionDelete email={user.email} />}
        </Page>
    );
};

export default UserPage;
