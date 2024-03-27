import { ChangeUserData, GetAllUserData, ManageAction } from "pages/ManagePage/model/types";
import { roleOptions } from "pages/UserPage/model/data";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Checked, Close } from "shared/assets/icons";
import { classNames } from "shared/lib/classNames";
import { formatDate } from "shared/lib/formatDate";
import { AppSelect } from "shared/ui/AppSelect/AppSelect";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Heading } from "shared/ui/Text/Heading";

type Props = {
    user: GetAllUserData;
    manageAction: ManageAction;
    onCancel: () => void;
    onSave: (date: ChangeUserData) => void;
};

export const ManageChange = ({ user, manageAction, onCancel, onSave }: Props) => {
    const { displayName, role, photo, updatedAt, createdAt, email, verified } = user;
    const defaultChange: ChangeUserData = { displayName, role, deletePhoto: false };
    const [changeData, setChangeData] = useState(defaultChange);
    const { i18n } = useTranslation();
    const isDefaultPhoto = photo === "default-user.jpeg";
    const areSame = JSON.stringify(changeData) === JSON.stringify(defaultChange);

    console.log(updatedAt);

    return (
        <>
            <Heading headinglevel={4}>Информация о пользователе</Heading>
            <div className="grid gap-x-4 grid-cols-[max-content,_1fr] gap-y-1 py-10">
                <p>DisplayName:</p>
                {!manageAction && <p className="truncate">{displayName}</p>}
                {manageAction === "change" && (
                    <Input
                        className="h-5 text-sm"
                        value={changeData.displayName}
                        onChange={(e) =>
                            setChangeData((p) => ({
                                ...p,
                                displayName: e.target.value,
                            }))
                        }
                    />
                )}

                <p>Email:</p>
                <p className="truncate">{email}</p>

                <p>Verified:</p>
                <div className="place-self-start">
                    {verified ? (
                        <div className="rounded-full p-[1px] text-my-green-500 border-2 border-my-green-500">
                            <Checked />
                        </div>
                    ) : (
                        <div className="rounded-full p-[1px] text-my-red-500 border-2 border-my-red-500">
                            <Close />
                        </div>
                    )}
                </div>

                <p>Role:</p>
                {!manageAction && <p>{role}</p>}
                {manageAction === "change" && (
                    <AppSelect
                        className="h-5 w-full font-normal text-sm"
                        value={changeData.role}
                        actionChange={(newData) => setChangeData((p) => ({ ...p, role: newData }))}
                        options={roleOptions}
                        itemHeight={20}
                    />
                )}

                <p>UpdatedAt:</p>
                <p>{formatDate(new Date(updatedAt), i18n.language, "long")}</p>

                <p>CreatedAt:</p>
                <p>{formatDate(new Date(createdAt), i18n.language, "long")}</p>

                {manageAction === "change" && !isDefaultPhoto && (
                    <>
                        <div />
                        <label className="flex items-center gap-2 cursor-pointer self-start hover:underline relative select-none place-self-start">
                            <input
                                className="appearance-none checked:bg-blue-500 cursor-pointer w-4 h-4 text-blue-500 bg-my-neutral-300 rounded focus:ring-blue-500 peer outline-none focus:ring-2 "
                                type="checkbox"
                                checked={changeData.deletePhoto}
                                onChange={(e) =>
                                    setChangeData((p) => ({
                                        ...p,
                                        deletePhoto: e.target.checked,
                                    }))
                                }
                            />
                            <p>Удалить фото профиля</p>
                            <Checked className="text-my-neutral-50 absolute left-0 top-1/2 -translate-y-1/2 hidden peer-checked:block" />
                        </label>
                    </>
                )}
            </div>
            {manageAction === "change" && (
                <div className="flex gap-4 self-end">
                    <Button
                        onClick={() => onSave(changeData)}
                        className={classNames("py-1 h-auto text-sm font-medium", {
                            ["hidden pointer-events-none"]: areSame,
                        })}
                        theme="blue"
                    >
                        Сохранить
                    </Button>
                    <Button
                        onClick={onCancel}
                        theme="regular"
                        className="py-1 h-auto text-sm font-medium"
                    >
                        Отмена
                    </Button>
                </div>
            )}
        </>
    );
};
