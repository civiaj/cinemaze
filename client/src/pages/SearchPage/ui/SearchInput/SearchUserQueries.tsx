import { useAppDispatch, useAppSelector } from "app/store";
import { getSearchUserQueriesByInput } from "pages/SearchPage/model/selectors";
import { searchPageActions } from "pages/SearchPage/model/slice";
import { useTranslation } from "react-i18next";
import { Search } from "shared/assets/icons";
import { UserBoxSeparator } from "shared/ui/Boxes/UserBox";

type Props = {
    inputValue?: string;
    startSearch: (query: string) => void;
};

export const SearchUserQueries = ({ inputValue = "", startSearch }: Props) => {
    const userQueries = useAppSelector((state) => getSearchUserQueriesByInput(state, inputValue));
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const handleDeleteUserQuery = (str: string) => {
        dispatch(searchPageActions.deleteUserQuery(str));
    };

    const handleSearchUserQuery = (query: string) => {
        startSearch(query);
        dispatch(searchPageActions.addUserQuery(query));
    };

    return (
        !!userQueries.length && (
            <>
                <div className="flex flex-col gap-1">
                    <p className="px-2 text-sm font-medium">{t("search.input-recent")}</p>
                    <ul className="flex flex-col">
                        {userQueries.map((query) => (
                            <li
                                className="flex hover:bg-my-neutral-200 rounded-xl font-medium"
                                key={query}
                            >
                                <button
                                    onClick={() => handleSearchUserQuery(query)}
                                    className="flex text-start items-center gap-2 px-2 py-1 flex-1"
                                >
                                    <Search />
                                    <p className="font-medium line-clamp-1 text-ellipsis flex-1">
                                        {query}
                                    </p>
                                </button>
                                <button
                                    onClick={() => handleDeleteUserQuery(query)}
                                    className="text-xs hover:underline shrink-0 pr-2 text-blue-500 z-50"
                                >
                                    {t("btn.delete")}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <UserBoxSeparator />
            </>
        )
    );
};
