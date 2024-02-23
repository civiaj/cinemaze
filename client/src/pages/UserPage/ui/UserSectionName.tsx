import { useUpdateDisplayNameMutation } from "entities/User";
import { t } from "i18next";

import { useState } from "react";
import formatServerError from "shared/api/helpers/formatServerError";
import { Left, Pencil } from "shared/assets/icons";
import { trimInput } from "shared/lib/trimInput";
import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";
import { FormErrorMsg } from "shared/ui/FormErrorMsg/FormErrorMsg";
import { Input } from "shared/ui/Input/Input";
import { Elipsis } from "shared/ui/Text/Elipsis";
import { Heading } from "shared/ui/Text/Heading";

type Props = {
    name: string;
    onChangeSection: (newSection: null) => void;
};

export const UserSectionName = (props: Props) => {
    const { name, onChangeSection } = props;

    const [isChanging, setIsChanging] = useState(false);
    const [newName, setNewName] = useState(name);
    const trimmedNewName = trimInput(newName, "name");

    const [updateName, { isLoading, isError, error }] = useUpdateDisplayNameMutation();

    const onCancel = () => {
        setNewName(name);
        setIsChanging(false);
    };

    const onSave = async () => {
        await updateName({ displayName: trimmedNewName })
            .unwrap()
            .then(() => onChangeSection(null));
    };

    let message: string | null = null;
    if (error) message = formatServerError(error);

    return (
        <Box className="sm:p-0 p-0">
            <div className="sm:py-6 sm:px-6 py-4 px-2 border-b border-border flex items-center gap-4">
                <Button
                    onClick={() => onChangeSection(null)}
                    theme="regularIcon"
                    className="rounded-full"
                >
                    <Left />
                </Button>
                <Heading headinglevel={1} className="font-medium">
                    {t("Name")}
                </Heading>
            </div>
            <div className="sm:py-6 py-4 flex flex-col gap-2 sm:gap-4">
                <div className="sm:px-6 px-2 flex flex-col gap-1">
                    <span>Имя</span>
                    <div className="flex justify-between items-center gap-2">
                        <div className="w-full flex flex-col gap-2">
                            {isChanging ? (
                                <Input
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full"
                                ></Input>
                            ) : (
                                <Elipsis className="sm:text-lg text-lg">{name}</Elipsis>
                            )}
                            {isChanging && <FormErrorMsg msg={message} isError={isError} />}
                        </div>
                        {!isChanging && (
                            <Button
                                onClick={() => setIsChanging(true)}
                                theme="regularIcon"
                                className="rounded-full"
                            >
                                <Pencil />
                            </Button>
                        )}
                    </div>
                </div>
                {isChanging && (
                    <div className="flex gap-2 sm:px-6 px-2 justify-end">
                        <Button
                            isLoading={isLoading}
                            onClick={onSave}
                            disabled={name === trimmedNewName}
                            theme="blue"
                        >
                            Сохранить
                        </Button>
                        <Button theme="regular" onClick={onCancel}>
                            Отмена
                        </Button>
                    </div>
                )}
            </div>
        </Box>
    );
};
