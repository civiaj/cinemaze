import { useAppDispatch, useAppSelector } from "@/app/store";
import { TSearchCategories, filmActions, getSearchQuery, orderOptions } from "@/entities/Film";
import { AppSelect } from "@/shared/ui/AppSelect/AppSelect";
import { Box } from "@/shared/ui/Boxes/Box";

interface SearchPageHeaderProps {
    disabled?: boolean;
}

export const SearchPageHeader = ({ disabled }: SearchPageHeaderProps) => {
    const order = useAppSelector(getSearchQuery);
    const dispatch = useAppDispatch();
    const handleOrderChange = (newOrder: string) => {
        dispatch(filmActions.setSearchQuery(newOrder as TSearchCategories));
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
