import { useState } from "react";
import { Settings } from "shared/assets/icons";
import { Button } from "shared/ui/Button/Button";
import { Heading } from "shared/ui/Text/Heading";

import { SearchFiltersT } from "../model/types";
import { SearchExtended } from "../ui/SearchExtended";

type Props = {
    disabled: boolean;
    data?: SearchFiltersT;
    isFilterLoading: boolean;
};

export const SearchExtendedSmall = (props: Props) => {
    const { disabled, data, isFilterLoading } = props;
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen((p) => !p);
    const handleClose = () => setIsOpen(false);

    return (
        <div className="flex lg:hidden flex-col gap-2 sm:gap-4">
            <div className="flex items-center justify-between flex-1">
                <Heading headinglevel={4}>Расширенный поиск</Heading>
                <Button theme="regularIcon" onClick={handleToggle}>
                    <Settings />
                </Button>
            </div>
            {isOpen && (
                <SearchExtended
                    data={data}
                    disabled={disabled}
                    onClose={handleClose}
                    isFilterLoading={isFilterLoading}
                />
            )}
        </div>
    );
};
