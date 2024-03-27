import {
    BlockUserData,
    ChangeUserData,
    GetAllUserData,
    ManageAction,
} from "pages/ManagePage/model/types";
import { useState } from "react";

import { ManageBlock } from "pages/ManagePage/ui/ManageBlock";
import { ManageChange } from "pages/ManagePage/ui/ManageChange";
import { Button } from "shared/ui/Button/Button";
import { GridMsg } from "shared/ui/GridMsg/GridMsg";

type Props = {
    user: GetAllUserData;
};

export const ManageListItemActions = ({ user }: Props) => {
    const { displayName } = user;
    const [manageAction, setManageAction] = useState<ManageAction>(null);

    const onCancel = () => setManageAction(null);
    const onSave = (data: BlockUserData | ChangeUserData) => {
        if (manageAction === "change") {
            console.log("saving changes...", data);
        }

        if (manageAction === "block") {
            console.log("blocking user...", data);
        }
    };

    return (
        <GridMsg isOpen={true} className="border border-border rounded-xl my-2">
            <div className="px-4 py-2 flex items-center justify-center flex-col">
                <div className="w-full flex flex-col gap-2">
                    {manageAction !== "block" ? (
                        <ManageChange
                            manageAction={manageAction}
                            user={user}
                            onCancel={onCancel}
                            onSave={onSave}
                        />
                    ) : (
                        <ManageBlock
                            displayName={displayName}
                            onCancel={onCancel}
                            onSave={onSave}
                        />
                    )}
                </div>

                {!manageAction && (
                    <div className="flex gap-4 self-end">
                        <Button
                            className="py-1 h-auto text-sm font-medium"
                            onClick={() => setManageAction("change")}
                            theme="regular"
                        >
                            Изменить
                        </Button>
                        <Button
                            theme="danger"
                            className="py-1 h-auto text-sm font-medium"
                            onClick={() => setManageAction("block")}
                        >
                            Заблокировать
                        </Button>
                    </div>
                )}
            </div>
        </GridMsg>
    );
};
