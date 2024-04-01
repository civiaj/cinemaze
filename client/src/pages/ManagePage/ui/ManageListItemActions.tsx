import { ManageActionViews } from "pages/ManagePage/model/types";
import { useMemo, useState } from "react";

import { TUser } from "entities/User";
import { ManageBan } from "pages/ManagePage/ui/ManageBan";
import { ManageViewAndUpdate } from "pages/ManagePage/ui/ManageViewAndUpdate";
import { ManageListItemActionsHeader } from "pages/ManagePage/ui/ManageListItemActionsHead";
import { GridMsg } from "shared/ui/GridMsg/GridMsg";
import { UserBoxSeparator } from "shared/ui/Boxes/UserBox";

type Props = {
    user: TUser;
    onSetActive: (newId: string | null) => void;
    onPreventCloseActive: (newValue: boolean) => void;
};

export const ManageListItemActions = ({ user, onSetActive, onPreventCloseActive }: Props) => {
    const { displayName } = user;
    const [manageView, setManageView] = useState<ManageActionViews>("info");
    const onSetManageView = (newView: ManageActionViews) => setManageView(newView);

    const manageActionHeader: Record<ManageActionViews, string> = useMemo(
        () => ({
            ban: `Запрет доступа ${displayName}`,
            update: `Изменение ${displayName}`,
            info: ` Информация о ${displayName}`,
        }),
        [displayName]
    );

    return (
        <GridMsg isOpen={true} className="border border-border rounded-xl my-2">
            <div className="w-full flex flex-col gap-4 px-4 py-4">
                <ManageListItemActionsHeader headerText={manageActionHeader[manageView]} />

                <UserBoxSeparator />

                {(manageView === "info" || manageView === "update") && (
                    <ManageViewAndUpdate
                        onPreventCloseActive={onPreventCloseActive}
                        manageView={manageView}
                        user={user}
                        onSetManageView={onSetManageView}
                        onSetActive={onSetActive}
                    />
                )}

                {manageView === "ban" && (
                    <ManageBan
                        user={user}
                        onSetManageView={onSetManageView}
                        onSetActive={onSetActive}
                    />
                )}
            </div>
        </GridMsg>
    );
};
