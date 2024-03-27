import { classNames } from "shared/lib/classNames";
import { Button } from "shared/ui/Button/Button";
import { Heading } from "shared/ui/Text/Heading";

import { BlockUserData } from "pages/ManagePage/model/types";
import { useState } from "react";
import { AppDatePicker } from "widgets/AppDatePicker/AppDatePicker";

type Props = { displayName: string; onCancel: () => void; onSave: (data: BlockUserData) => void };

export const ManageBlock = ({ displayName, onCancel, onSave }: Props) => {
    const defaultBlock: BlockUserData = { date: new Date(), msg: "" };
    const [blockData, setBlockData] = useState(defaultBlock);

    const areSame =
        blockData.date?.getDate() === defaultBlock.date?.getDate() &&
        blockData.date?.getMonth() === defaultBlock.date?.getMonth() &&
        blockData.date?.getFullYear() === defaultBlock.date?.getFullYear();

    return (
        <>
            <Heading headinglevel={4}>Блокирование пользователя {displayName}</Heading>
            <div className="grid gap-x-4 grid-cols-[max-content,_1fr] gap-y-1 py-10 rounded-xl">
                <p>Заблокировать до:</p>
                <div>
                    <AppDatePicker
                        selected={blockData.date}
                        minDate={new Date()}
                        showDisabledMonthNavigation
                        onChange={(date) => setBlockData((p) => ({ ...p, date }))}
                    />
                </div>

                <p>Текст сообщения:</p>
                <div className="overflow-hidden rounded-xl">
                    <textarea
                        className={classNames(
                            "outline-none w-full flex items-center justify-between h-10 text-start shrink-0 placeholder-my-neutral-400 text-inherit rounded-xl px-4 [&>*]:stroke-2 bg-my-neutral-100 hover:bg-my-neutral-200 focus:bg-my-neutral-200 text-sm max-h-52 min-h-[100px]",
                            { ["cursor-not-allowed"]: areSame }
                        )}
                        disabled={areSame}
                    />
                </div>
            </div>
            <div className="flex gap-4 self-end">
                <Button
                    onClick={() => onSave(blockData)}
                    className={classNames("py-1 h-auto text-sm font-medium", {
                        ["hidden pointer-events-none"]: areSame,
                    })}
                    theme="danger"
                >
                    Заблокировать
                </Button>
                <Button
                    onClick={onCancel}
                    theme="regular"
                    className="py-1 h-auto text-sm font-medium"
                >
                    Отмена
                </Button>
            </div>
        </>
    );
};
