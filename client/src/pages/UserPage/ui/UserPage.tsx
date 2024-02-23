import { useAppSelector } from "app/store";
import { Page } from "entities/Ui";
import { selectUser } from "entities/User";
import { TUserSection } from "pages/UserPage/model/types";
import { UserSectionHome } from "pages/UserPage/ui/UserSectionHome";
import { UserSectionName } from "pages/UserPage/ui/UserSectionName";
import { UserSectionPhoto } from "pages/UserPage/ui/UserSectionPhoto";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const UserPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const section: null | string | TUserSection = searchParams.get("section");
    const user = useAppSelector(selectUser);

    const onChangeSection = useCallback(
        (newSection: null | TUserSection) => {
            if (!newSection) return setSearchParams();
            searchParams.set("section", newSection);
            setSearchParams(searchParams);
        },
        [setSearchParams, searchParams]
    );

    if (!user) return "нет пользователя";

    return (
        <Page>
            {!section && <UserSectionHome user={user} onChangeSection={onChangeSection} />}

            {section === "photo" && (
                <UserSectionPhoto photo={user.photo} onChangeSection={onChangeSection} />
            )}

            {section === "name" && (
                <UserSectionName name={user.displayName} onChangeSection={onChangeSection} />
            )}
        </Page>
    );
};

export default UserPage;
