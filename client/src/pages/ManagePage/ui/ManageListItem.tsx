import { Block, Checked, Close, Minus } from "shared/assets/icons";
import { classNames } from "shared/lib/classNames";
import { formatDate } from "shared/lib/formatDate";
import { AppImage } from "shared/ui/AppImage/AppImage";
import { Elipsis } from "shared/ui/Text/Elipsis";

import { ManageListItemActions } from "pages/ManagePage/ui/ManageListItemActions";
import { useTranslation } from "react-i18next";
import { TUser } from "entities/User";

type Props = {
    user: TUser;
    index: number;
    activeUser: string | null;
    onSetActive: (newId: string | null) => void;
    onPreventCloseActive: (newValue: boolean) => void;
    className?: string;
};

export const ManageListItem = ({
    user,
    index,
    activeUser,
    onSetActive,
    className,
    onPreventCloseActive,
}: Props) => {
    const { createdAt, displayName, email, id, photo, role, updatedAt, verified, isBanned } = user;
    const { i18n } = useTranslation();
    const currentIsActive = activeUser === id;

    return (
        <>
            <tr
                className={classNames(
                    "h-12 hover:bg-my-neutral-100 relative",
                    {
                        ["bg-my-neutral-200"]: currentIsActive,
                    },
                    [className]
                )}
                role="button"
                aria-pressed="false"
                onClick={() => onSetActive(currentIsActive ? null : id)}
            >
                <th scope="row" className="px-1 rounded-l-xl">
                    <div className="flex gap-2 items-center max-w-[250px]">
                        <p className="font-normal w-10 shrink-0">{index + 1}</p>
                        <AppImage
                            containerClassName="w-10 h-10 shrink-0 rounded-xl"
                            onErrorSrc="user"
                            src={photo}
                        />
                        <Elipsis className="font-medium">{displayName}</Elipsis>
                    </div>
                </th>
                <td className="align-center text-center px-1 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                        {verified ? (
                            <div className="rounded-full p-[1px] text-my-green-500 border-2 border-my-green-500">
                                <Checked />
                            </div>
                        ) : (
                            <div className="rounded-full p-[1px] text-my-neutral-500 border-2 border-my-neutral-500">
                                <Close />
                            </div>
                        )}
                    </div>
                </td>
                <td className="align-center text-center px-1 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                        {isBanned ? (
                            <div className="rounded-full p-[1px] text-my-red-500 border-2 border-my-red-500">
                                <Block />
                            </div>
                        ) : (
                            <div className="rounded-full p-[1px] text-my-neutral-500 border-2 border-my-neutral-500">
                                <Minus />
                            </div>
                        )}
                    </div>
                </td>
                <td className="px-1 whitespace-nowrap hidden mdb:table-cell">
                    <div className="max-w-[250px] flex justify-center">
                        <Elipsis>{email}</Elipsis>
                    </div>
                </td>
                <td className="align-center text-center px-1 whitespace-nowrap rounded-r-xl appcontainer:rounded-r-none">
                    {role}
                </td>
                <td className="align-center text-center px-1 whitespace-nowrap hidden appcontainer:table-cell">
                    {formatDate(new Date(updatedAt), i18n.language)}
                </td>
                <td className="align-center text-center px-1 whitespace-nowrap hidden appcontainer:table-cell rounded-r-xl">
                    {formatDate(new Date(createdAt), i18n.language)}
                </td>
            </tr>
            {currentIsActive && (
                <tr className={className}>
                    <td colSpan={7}>
                        <ManageListItemActions
                            onPreventCloseActive={onPreventCloseActive}
                            user={user}
                            onSetActive={onSetActive}
                        />
                    </td>
                </tr>
            )}
        </>
    );
};
