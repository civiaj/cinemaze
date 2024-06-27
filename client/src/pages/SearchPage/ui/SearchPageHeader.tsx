import { useAppDispatch, useAppSelector } from "@/app/store";
import { TSearchCategories, orderOptions } from "@/entities/Film";
import { AppSelect } from "@/shared/ui/AppSelect/AppSelect";
import { Box } from "@/shared/ui/Boxes/Box";
import { getSearchOrder } from "../model/selectors";
import { searchPageActions } from "../model/slice";

interface SearchPageHeaderProps {
    disabled?: boolean;
}

export const SearchPageHeader = ({ disabled }: SearchPageHeaderProps) => {
    const order = useAppSelector(getSearchOrder);
    const dispatch = useAppDispatch();
    const handleOrderChange = (newOrder: string) => {
        dispatch(searchPageActions.setOrder(newOrder as TSearchCategories));
    };

    return (
        <Box className="flex-row gap-2 items-center justify-between">
            <AppSelect
                disabled={disabled}
                className="w-52 vsm:w-60"
                options={orderOptions}
                value={order}
                actionChange={handleOrderChange}
            />
        </Box>
    );
};
