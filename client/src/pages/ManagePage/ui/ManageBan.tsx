import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TUser } from "@/entities/User";
import { useBanOneMutation } from "@/pages/ManagePage/model/manageApi";
import { BlockUserData, ManageActionViews } from "@/pages/ManagePage/model/types";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { classNames } from "@/shared/lib/classNames";
import { UserBoxSeparator } from "@/shared/ui/Boxes/UserBox";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { AppDatePicker } from "@/widgets/AppDatePicker/AppDatePicker";


type Props = {
    user: TUser;
    onSetManageView: (newView: ManageActionViews) => void;
    onSetActive: (newId: string | null) => void;
};

export const ManageBan = ({ user, onSetManageView, onSetActive }: Props) => {
    const defaultBlock: BlockUserData = { banExpiration: new Date(), banMessage: "" };
    const [blockData, setBlockData] = useState(defaultBlock);

    const areSame =
        blockData.banExpiration?.setHours(0, 0, 0, 0) ===
        defaultBlock.banExpiration?.setHours(0, 0, 0, 0);

    const { t } = useTranslation();

    const [banOne, { isLoading, isError, error, reset }] = useBanOneMutation();

    const onBlockUser = (data: BlockUserData) => {
        const { banExpiration, banMessage } = data;
        if (!banExpiration) return;

        banOne({
            banMessage,
            banExpiration: banExpiration.toISOString(),
            manageUserId: user.id,
            displayName: user.displayName,
        })
            .unwrap()
            .then(() => onSetActive(null));
    };

    const handleCancel = () => {
        onSetManageView("info");
        setBlockData(defaultBlock);
        reset();
    };

    return (
        <>
            <div className="grid  grid-cols-[max-content,_1fr] gap-x-4 gap-y-1 rounded-xl">
                <p>{t("manage.banExpiration")}</p>
                <div>
                    <AppDatePicker
                        selected={blockData.banExpiration}
                        minDate={new Date()}
                        showDisabledMonthNavigation
                        onChange={(date) =>
                            setBlockData((p) => ({ ...p, banExpiration: date as Date }))
                        }
                    />
                </div>
                <p>{t("manage.banMessage")}</p>
                <div className="overflow-hidden rounded-xl">
                    <textarea
                        value={blockData.banMessage}
                        onChange={(e) =>
                            setBlockData((p) => ({ ...p, banMessage: e.target.value }))
                        }
                        className={classNames(
                            "outline-none w-full flex items-center justify-between h-10 text-start shrink-0 placeholder-my-neutral-400 text-inherit rounded-xl px-4 [&>*]:stroke-2 bg-my-neutral-100 hover:bg-my-neutral-200 focus:bg-my-neutral-200 text-sm max-h-52 min-h-[100px]",
                            { ["cursor-not-allowed"]: areSame }
                        )}
                        disabled={areSame}
                    />
                </div>
            </div>

            {isError && (
                <div className="w-full">
                    <GridMsg
                        className="bg-my-red-200"
                        isOpen={isError}
                        msg={formatServerError(error)}
                    />
                </div>
            )}

            <UserBoxSeparator />

            <div className="flex gap-4 self-end">
                <Button
                    onClick={() => onBlockUser(blockData)}
                    className={classNames("py-1 h-auto text-sm font-medium", {
                        ["hidden pointer-events-none"]: areSame,
                    })}
                    theme="danger"
                    isLoading={isLoading}
                >
                    {t("btn.block")}
                </Button>
                <Button
                    onClick={handleCancel}
                    theme="regular"
                    className="py-1 h-auto text-sm font-medium"
                    disabled={isLoading}
                >
                    {t("btn.cancel")}
                </Button>
            </div>
        </>
    );
};
