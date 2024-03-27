import { useAppDispatch, useAppSelector } from "app/store";
import { getAllUsersFilterOptions } from "pages/ManagePage/model/data";
import { useGetUsersQuery } from "pages/ManagePage/model/manageApi";
import { getManageState } from "pages/ManagePage/model/selectors";
import { manageActions } from "pages/ManagePage/model/slice";
import { GetAllUsersFilter } from "pages/ManagePage/model/types";
import { ManageListItem } from "pages/ManagePage/ui/ManageListItem";
import { useState } from "react";
import formatServerError from "shared/api/helpers/formatServerError";
import { Ascending, Descending } from "shared/assets/icons";
import { useDebouncedValue } from "shared/hooks/useDebouncedValue";
import { classNames } from "shared/lib/classNames";
import { Box } from "shared/ui/Boxes/Box";
import { StatusBox } from "shared/ui/Boxes/StatusBox";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { OutsideClickWrapper } from "shared/ui/OutsideClickWrapper/OutsideClickWrapper";
import { Spinner } from "shared/ui/Spinner/Spinner";
import { Heading } from "shared/ui/Text/Heading";
import { Text } from "shared/ui/Text/Text";
import { Pagination } from "widgets/Pagination/Pagination";

export const ManageList = () => {
    const { filter, order } = useAppSelector(getManageState);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(1);
    const [activeUser, setActiveUser] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebouncedValue(query);

    const { data, isLoading, isFetching, isError, error } = useGetUsersQuery({
        filter,
        order,
        page,
        query: debouncedQuery,
    });

    const onSetActive = (newId: string | null) => setActiveUser(newId);

    const onChangeTable = (newFilter: GetAllUsersFilter) => {
        if (filter === newFilter) dispatch(manageActions.toggleOrder());
        else dispatch(manageActions.setFilter(newFilter));
        setPage(1);
    };

    if (isError) return <StatusBox isError={isError} errorMsg={formatServerError(error)} />;

    const noResults = !data?.users.length;

    return (
        <Box>
            <div className="flex justify-between items-center">
                <Heading headinglevel={1}>Manage</Heading>
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Поиск по имени"
                />
            </div>
            <OutsideClickWrapper
                onClose={() => onSetActive(null)}
                className="overflow-x-auto w-full relative"
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
                                        <Text className="font-medium">{option.label}</Text>
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
                                <td scope="row" colSpan={6}>
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
                                        <td scope="row" colSpan={6}>
                                            <div className="h-56 flex items-center justify-center">
                                                <Text className="font-normal">
                                                    Ничего не найдено. Попробуйте изменить параметры
                                                    поиска.
                                                </Text>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    data?.users.map((user, index) => (
                                        <ManageListItem
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
            <Pagination
                disabled={isLoading || isFetching}
                activePage={page}
                numOfPages={data?.totalPages}
                changePage={setPage}
            />
        </Box>
    );
};
