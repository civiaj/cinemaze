import { useAppDispatch, useAppSelector } from "app/store";

import { orderOptions } from "pages/SearchPage/config/data";
import { getSearchOrder } from "pages/SearchPage/model/selectors";
import { searchPageActions } from "pages/SearchPage/model/slice";
import { SearchOrderT } from "pages/SearchPage/model/types";
import { AppSelect } from "shared/ui/AppSelect/AppSelect";
import { Box } from "shared/ui/Boxes/Box";

interface SearchPageHeaderProps {
    disabled?: boolean;
}

export const SearchPageHeader = ({ disabled }: SearchPageHeaderProps) => {
    const order = useAppSelector(getSearchOrder);
    const dispatch = useAppDispatch();

    const handleOrderChange = (newOrder: string) => {
        dispatch(searchPageActions.setOrder(newOrder as SearchOrderT));
        dispatch(searchPageActions.startSearch());
    };

    return (
        <Box className="flex-row gap-2 items-center justify-between">
            <AppSelect
                disabled={disabled}
                className="w-52 vsm:w-60 "
                options={orderOptions}
                value={order}
                actionChange={handleOrderChange}
            />
        </Box>
    );
};
