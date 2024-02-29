import { routePath } from "app/router/router";
import { SessionIdentifier, useGetSessionsQuery, useRemoveSessionMutation } from "entities/User";

import { t } from "i18next";
import { useCallback, useState } from "react";
import formatServerError from "shared/api/helpers/formatServerError";
import { Close, Left, Stop } from "shared/assets/icons";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Box } from "shared/ui/Boxes/Box";
import { Modal } from "shared/ui/Boxes/Modal";
import { UserBox } from "shared/ui/Boxes/UserBox";
import { Button } from "shared/ui/Button/Button";
import { FormErrorMsg } from "shared/ui/FormErrorMsg/FormErrorMsg";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { Elipsis } from "shared/ui/Text/Elipsis";
import { Heading } from "shared/ui/Text/Heading";
import { Text } from "shared/ui/Text/Text";

type ModalData = SessionIdentifier | "all" | null;

export const UserSectionDevices = () => {
    const { data, isLoading, isFetching } = useGetSessionsQuery();
    const loading = isLoading || isFetching;

    const [modalData, setModalData] = useState<ModalData>(null);
    const onClose = useCallback(() => setModalData(null), []);

    return (
        <>
            <Box className="sm:p-0 p-0 gap-0 sm:gap-0">
                <UserBox>
                    <div className="flex items-center gap-4">
                        <AppLink to={routePath.user} theme="regular-icon" className="rounded-full">
                            <Left />
                        </AppLink>
                        <Heading headinglevel={1} className="font-medium">
                            {t("Devices")}
                        </Heading>
                    </div>
                </UserBox>

                <UserBox>
                    <div className="grid grid-cols-[2fr,3fr] items-start gap-x-4">
                        <Elipsis>Текущее устройство</Elipsis>
                        {loading ? (
                            <Skeleton className="h-9 sm:h-11 w-1/3" />
                        ) : (
                            <div className="flex flex-col">
                                <Elipsis className="font-medium">{data?.current.os}</Elipsis>
                                <Elipsis className="text-xs sm:text-sm text-my-neutral-500">
                                    {data?.current.browser} {data?.current.version}
                                </Elipsis>
                            </div>
                        )}
                    </div>
                </UserBox>
                <UserBox>
                    <div className="grid grid-cols-[2fr,3fr] items-start gap-x-4">
                        <Elipsis>Активные сеансы</Elipsis>
                        <div className="flex flex-col gap-2">
                            {loading
                                ? Array.from({ length: 2 }, (_, i) => i).map((_, index) => (
                                      <Skeleton key={index} className="h-9 sm:h-11 w-1/3" />
                                  ))
                                : data?.other.map((item) => (
                                      <div
                                          className="flex justify-between items-center"
                                          key={`${JSON.stringify(item)}`}
                                      >
                                          <div className="flex flex-col">
                                              <Elipsis className="font-medium">{item.os}</Elipsis>
                                              <Elipsis className="text-xs sm:text-sm text-my-neutral-500">
                                                  {item.browser} {item.version}
                                              </Elipsis>
                                          </div>
                                          <Button
                                              onClick={() => setModalData(item)}
                                              theme="regularIcon"
                                              className="rounded-full"
                                          >
                                              <Close className="text-xl" />
                                          </Button>
                                      </div>
                                  ))}

                            {data && !data.other.length && <Text>Активных сеансов не найдено</Text>}
                        </div>
                    </div>
                </UserBox>
                <UserBox className="border-0">
                    {loading ? (
                        <Skeleton className="h-10 self-end w-52 sm:w-56" />
                    ) : (
                        <Button
                            onClick={() => setModalData("all")}
                            className="self-end gap-2"
                            theme="danger"
                            disabled={!data?.other.length}
                        >
                            <Stop className="text-xl" />
                            <Text>Завершить все сеансы</Text>
                        </Button>
                    )}
                </UserBox>
            </Box>
            {modalData && <DevicesModal modalData={modalData} onClose={onClose} />}
        </>
    );
};

const DevicesModal = ({ modalData, onClose }: { modalData: ModalData; onClose: () => void }) => {
    const [removeSession, { isLoading, isError, error }] = useRemoveSessionMutation();

    const onRemoveSession = () => {
        const session = modalData === "all" ? "all" : JSON.stringify(modalData);
        removeSession({ session })
            .unwrap()
            .then(() => onClose());
    };

    if (!modalData) return null;

    return (
        <Modal onClose={onClose} header={t("Devices")} theme="danger">
            {modalData === "all" ? (
                <p>Вы действительно хотите завершить все сеансы, кроме текущего?</p>
            ) : (
                <>
                    <p>Вы действительно хотите завершить сеанс:</p>
                    <UserBox className="border rounded-xl">
                        <Elipsis className="font-medium">
                            {modalData.os} {modalData.browser} {modalData.version}
                        </Elipsis>
                    </UserBox>
                </>
            )}
            {<FormErrorMsg isError={isError} msg={formatServerError(error)} />}
            <div className="flex gap-2 self-end">
                <Button isLoading={isLoading} onClick={onRemoveSession} theme="danger">
                    <Text>Завершить</Text>
                </Button>
                <Button onClick={onClose} theme="regular">
                    <Text>Отмена</Text>
                </Button>
            </div>
        </Modal>
    );
};
