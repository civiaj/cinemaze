import { useTranslation } from "react-i18next";
import { routePath } from "@/app/router/router";
import { useAppDispatch } from "@/app/store";
import { SearchInputFormProps } from "@/pages/SearchPage/model/types";
import { useSearchQuery } from "@/entities/Film";
import formatServerError from "@/shared/api/helpers/formatServerError";
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
import { searchPageActions } from "../../../model/slice";

export const SearchQueryResults = (
    props: Pick<SearchInputFormProps, "inputValue"> & { onSetInactive: () => void }
) => {
    const { inputValue, onSetInactive } = props;
    const dispatch = useAppDispatch();
    const { t, i18n } = useTranslation();
    const inputValueDeb = useDebouncedValue(inputValue, DEBOUNCE_SEARCH);

    const { data, isLoading, isError, error, isFetching } = useSearchQuery(
        { keyword: inputValueDeb },
        { skip: !inputValueDeb || !inputValue }
    );

    const handleQueryClick = () => {
        onSetInactive();
        dispatch(searchPageActions.addUserQuery(inputValueDeb));
    };

    if (isLoading || isFetching || (inputValue !== inputValueDeb && inputValue !== ""))
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
                        msgOrChildren={formatServerError(error)}
                        withoutBox
                    />
                </div>
                <UserBoxSeparator />
            </>
        );

    if (data && !data.films.length && inputValue)
        return (
            <>
                <div className="flex py-2 flex-col text-center">
                    <Text>{t("search.empty-msg")},</Text>
                    <Text>{t("search.empty-msg-add")}</Text>
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
                        {data.films.map((item) => {
                            const { id, posterUrlPreview, nameOriginal, rating, year } = item;
                            return (
                                <li key={id}>
                                    <AppLink
                                        theme="clean"
                                        to={`${routePath.details}/${id}`}
                                        onClick={handleQueryClick}
                                        className="py-1 block rounded-xl overflow-hidden"
                                    >
                                        <div className="px-2 flex gap-2">
                                            {Boolean(posterUrlPreview) && (
                                                <div className="h-24 w-16 rounded-xl overflow-hidden">
                                                    <AppImage src={posterUrlPreview!} />
                                                </div>
                                            )}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <p className="font-medium line-clamp-1 text-ellipsis flex-1">
                                                    {getFilmTitle(item, i18n.language as TLngs)}
                                                </p>

                                                {nameOriginal && (
                                                    <p className="line-clamp-1 text-ellipsis flex-1 text-sm font-normal">
                                                        {nameOriginal}
                                                    </p>
                                                )}
                                                <ColoredNumber number={Number(rating)} />
                                                <p className="font-base">{year}</p>
                                            </div>
                                        </div>
                                    </AppLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <UserBoxSeparator />
            </>
        )
    );
};
