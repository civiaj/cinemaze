import { useAppDispatch, useAppSelector } from "app/store";
import { AppSelect } from "shared/ui/AppSelect/AppSelect";
import { Box } from "shared/ui/Boxes/Box";

import { orderOptions } from "../config/data";
import { getSearchOrder } from "../model/selectors";
import { searchPageActions } from "../model/slice";
import { SearchOrderT } from "../model/types";

interface SearchPageHeaderProps {
    disabled?: boolean;
}

export const SearchPageHeader = ({ disabled }: SearchPageHeaderProps) => {
    const order = useAppSelector(getSearchOrder);
    const dispatch = useAppDispatch();

    const handleOrderChange = (newOrder: string) => {
        dispatch(searchPageActions.setOrder(newOrder as SearchOrderT));
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
