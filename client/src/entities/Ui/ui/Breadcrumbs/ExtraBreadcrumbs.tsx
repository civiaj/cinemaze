import { useAppSelector } from "@/app/store";
import { Dots } from "@/shared/assets/icons";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { OutsideClickWrapper } from "@/shared/ui/Boxes/OutsideClickWrapper";
import { Button } from "@/shared/ui/Button/Button";
import { PopupList } from "@/shared/ui/PopupList/PopupList";
import { useCallback, useState } from "react";
import { getBreadcrumbs } from "../../model/selectors";

type Props = {
    displayedIndex: number;
};

export const ExtraBreadcrumbs = ({ displayedIndex }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const onToggle = () => setIsOpen((p) => !p);
    const onClose = useCallback(() => setIsOpen(false), []);

    const { details: branches } = useAppSelector(getBreadcrumbs);
    const options = branches.slice(0, displayedIndex).reverse();

    const handleChangeBranch = useCallback(() => setIsOpen(false), []);

    return (
        <OutsideClickWrapper onClose={onClose} className="ml-2">
            <Button theme="regularIcon" onClick={onToggle} className="rounded-full h-8 w-8">
                <Dots />
            </Button>
            <PopupList
                className="w-52 z-10"
                transitionValue={isOpen}
                itemCount={options.length}
                render={({ index, style }) => (
                    <AppLink
                        style={style}
                        theme="popup"
                        to={options[index].pathname}
                        onClick={handleChangeBranch}
                        className="focus:ring-0 text-sm"
                    >
                        <p className="truncate">{options[index].label}</p>
                    </AppLink>
                )}
            />
        </OutsideClickWrapper>
    );
};
