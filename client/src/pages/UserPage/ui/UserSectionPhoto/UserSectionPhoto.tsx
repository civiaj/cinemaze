import { useSearchParams } from "react-router-dom";
import { UserChangePhoto } from "./UserChangePhoto";
import { UserCurrentPhoto } from "./UserCurrentPhoto";

type Props = {
    photo: string;
    onClose: () => void;
};

const defaultPhoto = import.meta.env.VITE_STATIC_PROFILE_DEFAULT;

export const UserSectionPhoto = (props: Props) => {
    const { photo, onClose } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const isDefault = photo === defaultPhoto;

    const isChange = searchParams.get("change") === "change";
    const isRemove = searchParams.get("change") === "remove";

    const onSetSection = (value: "current" | "change" | "remove") => {
        if (!value) {
            searchParams.delete("change");
            setSearchParams(searchParams);
        } else {
            searchParams.set("change", value);
            setSearchParams(searchParams);
        }
    };

    return (
        <>
            {!isChange && (
                <UserCurrentPhoto
                    photo={photo}
                    onSetSection={onSetSection}
                    onClose={onClose}
                    isDefault={isDefault}
                    isRemove={isRemove}
                />
            )}
            {isChange && (
                <UserChangePhoto
                    onClose={onClose}
                    isDefault={isDefault}
                    onSetSection={onSetSection}
                />
            )}
        </>
    );
};
