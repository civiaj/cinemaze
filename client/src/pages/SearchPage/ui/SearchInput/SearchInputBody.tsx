import { useTranslation } from "react-i18next";
import { routePath } from "@/app/router/router";
import { SearchQueryResults } from "@/pages/SearchPage/ui/SearchInput/SearchQueryResults";
import { SearchUserQueries } from "@/pages/SearchPage/ui/SearchInput/SearchUserQueries";
import { GoToSearch } from "@/shared/assets/icons";
import { useUpdateHeight } from "@/shared/hooks/useUpdateHeight";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { extraHeight } from "../../config/data";

type SearchBodyProps = {
    inputValue: string;
    onSetInactive: () => void;
    handleStartSearch: () => void;
};

export const SearchInputBody = ({
    inputValue,
    onSetInactive,
    handleStartSearch,
}: SearchBodyProps) => {
    const maxHeight = useUpdateHeight(extraHeight);
    const { t } = useTranslation();

    return (
        <div className="overflow-hidden rounded-xl absolute top-full left-0 mb-5 mt-4 w-full">
            <div
                style={{ maxHeight }}
                className="w-full bg-my-white border border-my-neutral-200 overflow-y-auto px-2 py-2 flex flex-col gap-2 overflow-x-hidden"
            >
                <SearchUserQueries inputValue={inputValue} startSearch={handleStartSearch} />
                <SearchQueryResults inputValue={inputValue} onClose={onSetInactive} />
                <AppLink
                    theme="clean"
                    className="flex items-center gap-2 px-2 text-my-green-500"
                    to={routePath.search}
                    onClick={onSetInactive}
                >
                    <div className="flex-1 flex items-center justify-center gap-2">
                        <GoToSearch className="shrink-0" />
                        <span>{t("search.extended")}</span>
                    </div>
                </AppLink>
            </div>
        </div>
    );
};
