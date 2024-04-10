import { useTranslation } from "react-i18next";
import { routePath } from "@/app/router/router";
import { useAppDispatch } from "@/app/store";
import formatFilmError from "@/shared/api/helpers/formatFilmError";
import { DEBOUNCE_SEARCH } from "@/shared/const/const";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import { TLngs } from "@/shared/i18n/types";
import { getFilmTitle } from "@/shared/lib/getFilmTitle";
import { AppImage } from "@/shared/ui/AppImage/AppImage";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { StatusBox } from "@/shared/ui/Boxes/StatusBox";
import { UserBoxSeparator } from "@/shared/ui/Boxes/UserBox";
import { ColoredNumber } from "@/shared/ui/ColoredNumber/ColoredNumber";
import { Spinner } from "@/shared/ui/Spinner/Spinner";
import { Text } from "@/shared/ui/Text/Text";
import { useSearchQuery } from "../../model/searchPageApi";
import { searchPageActions } from "../../model/slice";

type Props = {
    inputValue?: string;
    onClose: () => void;
};

export const SearchQueryResults = (props: Props) => {
    const { inputValue, onClose } = props;
    const dispatch = useAppDispatch();
    const { t, i18n } = useTranslation();
    const debouncedInputValue = useDebouncedValue(inputValue, DEBOUNCE_SEARCH);

    const { data, isLoading, isError, error, isFetching } = useSearchQuery(
        { keyword: debouncedInputValue, page: 1 },
        { skip: !debouncedInputValue || !inputValue }
    );

    const handleQueryClick = (queryName?: string) => {
        onClose();
        if (!queryName) return;
        dispatch(searchPageActions.addUserQuery(queryName));
    };

    if (isLoading || isFetching || (inputValue !== debouncedInputValue && inputValue !== ""))
        return (
            <>
                <div className="flex items-center justify-center py-2">
                    <Spinner className="h-6 w-6" />
                </div>
                <UserBoxSeparator />
            </>
        );

    if (isError && inputValue)
        return (
            <>
                <div className="flex items-center flex-col gap-2">
                    <StatusBox
                        isError={isError}
                        msgOrChildren={formatFilmError(error)}
                        withoutBox
                    />
                </div>
                <UserBoxSeparator />
            </>
        );

    if (data && !data.films.length && inputValue)
        return (
            <>
                <div className="flex items-center justify-center py-2">
                    <Text className="text-center">{t("search.empty-msg")}</Text>
                </div>
                <UserBoxSeparator />
            </>
        );

    return (
        !!data?.films?.length && (
            <>
                <div className="flex flex-col gap-1">
                    <p className="px-2 text-sm font-medium">{t("search.input-results")}</p>
                    <ul className="flex flex-col">
                        {data.films.map((item) => (
                            <li key={item.filmId} className="rounded-xl overflow-hidden">
                                <AppLink
                                    theme="clean"
                                    to={`${routePath.details}/${item.filmId}`}
                                    onClick={() =>
                                        handleQueryClick(
                                            item.nameRu ?? item.nameEn ?? item.nameOriginal
                                        )
                                    }
                                    className="py-1 block"
                                >
                                    <div className="px-2 flex gap-2">
                                        <div className="h-24 w-16 rounded-xl overflow-hidden">
                                            <AppImage src={item.posterUrlPreview} />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <p className="font-medium line-clamp-1 text-ellipsis flex-1">
                                                {getFilmTitle(item, i18n.language as TLngs)}
                                            </p>

                                            {item.nameOriginal && (
                                                <p className="line-clamp-1 text-ellipsis flex-1 text-sm font-normal">
                                                    {item.nameOriginal}
                                                </p>
                                            )}
                                            <ColoredNumber number={Number(item.rating)} />
                                            <p className="font-base">{item.year}</p>
                                        </div>
                                    </div>
                                </AppLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <UserBoxSeparator />
            </>
        )
    );
};
