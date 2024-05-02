import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/app/store";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { Ascending, Descending } from "@/shared/assets/icons";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import { TLngs } from "@/shared/i18n/types";
import { classNames } from "@/shared/lib/classNames";
import { Box } from "@/shared/ui/Boxes/Box";
import { OutsideClickWrapper } from "@/shared/ui/Boxes/OutsideClickWrapper";
import { StatusBox } from "@/shared/ui/Boxes/StatusBox";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Pagination } from "@/shared/ui/Pagination/Pagination";
import { Spinner } from "@/shared/ui/Spinner/Spinner";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";
import { getAllUsersFilterOptions } from "../model/data";
import { useGetUsersQuery } from "../model/manageApi";
import { getManageState } from "../model/selectors";
import { manageActions } from "../model/slice";
import { GetAllUsersFilter } from "../model/types";
import { ManageListItem } from "../ui/ManageListItem";

export const ManageList = () => {
    const { filter, order } = useAppSelector(getManageState);
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(1);
    const [activeUser, setActiveUser] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebouncedValue(query);
    const [preventClose, setPreventClose] = useState(false);

    const onPreventClose = (newValue: boolean) => setPreventClose(newValue);
    const onCloseActive = () => onSetActive(null);

    const { data, isLoading, isFetching, isError, error } = useGetUsersQuery({
        filter,
        order,
        page,
        query: debouncedQuery,
        locale: i18n.language as TLngs,
    });

    const onSetActive = (newId: string | null) => setActiveUser(newId);

    const onChangeTable = (newFilter: GetAllUsersFilter) => {
        if (filter === newFilter) dispatch(manageActions.toggleOrder());
        else dispatch(manageActions.setFilter(newFilter));
        setPage(1);
    };

    if (isError)
        return <StatusBox isError={isError} msgOrChildren={formatServerError(error)} reload />;

    const noResults = !data?.users.length;

    return (
        <Box>
            <div className="flex justify-between items-center">
                <Heading headinglevel={1}>{t("manage-t")}</Heading>
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("manage.search-name")}
                />
            </div>
            <OutsideClickWrapper
                onClose={onCloseActive}
                className="overflow-x-auto w-full relative"
                preventClose={preventClose}
            >
                <table className={"w-full text-sm sm:text-sm"}>
                    <thead>
                        <tr className="h-11">
                            {getAllUsersFilterOptions.map((option) => (
                                <th scope="col" key={option.value} className={option.className}>
                                    <Button
                                        onClick={() => onChangeTable(option.value)}
                                        disabled={isFetching}
                                        theme="clean"
                                        className={classNames("w-full", {
                                            ["bg-my-neutral-200 justify-between"]:
                                                filter === option.value,
                                        })}
                                    >
                                        <Text className="font-medium">{t(option.label)}</Text>
                                        {filter === option.value && (
                                            <>{order === 1 ? <Ascending /> : <Descending />}</>
                                        )}
                                    </Button>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="relative">
                        {isLoading && (
                            <tr>
                                <td scope="row" colSpan={8}>
                                    <div className="h-56 flex items-center justify-center">
                                        <Spinner />
                                    </div>
                                </td>
                            </tr>
                        )}
                        {!isLoading && (
                            <>
                                {noResults ? (
                                    <tr
                                        className={classNames("", {
                                            ["opacity-20 pointer-events-none"]:
                                                isFetching && !isLoading,
                                        })}
                                    >
                                        <td scope="row" colSpan={8}>
                                            <div className="h-56 flex items-center justify-center">
                                                <Text className="font-normal text-center">
                                                    {t("search.empty-msg")}
                                                </Text>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    data?.users.map((user, index) => (
                                        <ManageListItem
                                            onPreventClose={onPreventClose}
                                            onSetActive={onSetActive}
                                            activeUser={activeUser}
                                            key={user.id}
                                            user={user}
                                            index={index}
                                            className={classNames("", {
                                                ["opacity-20 pointer-events-none"]:
                                                    isFetching && !isLoading,
                                            })}
                                        />
                                    ))
                                )}
                            </>
                        )}
                        {isFetching && !isLoading && (
                            <tr className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <td>
                                    <Spinner />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </OutsideClickWrapper>
            {!isLoading && (
                <Pagination
                    disabled={isFetching}
                    activePage={page}
                    numOfPages={data?.totalPages}
                    changePage={setPage}
                />
            )}
        </Box>
    );
};
