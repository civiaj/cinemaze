import { useAppSelector } from "app/store";
import { useDispatch } from "react-redux";
import { List, Tile } from "shared/assets/icons";
import { classNames } from "shared/lib/classNames";
import { Button } from "shared/ui/Button/Button";
import { getUiAppearance } from "../model/selectors";
import { uiActions } from "../model/slice";
import { TAppearances } from "../model/types";
import { memo } from "react";

interface ViewChangeProps {
    className?: string;
    disabled?: boolean;
}

export const UiAppearanceChange = memo((props: ViewChangeProps) => {
    const { className, disabled } = props;

    const dispatch = useDispatch();
    const appearance = useAppSelector(getUiAppearance);

    const onSetAppearance = (view: TAppearances) => {
        console.log(view);
        if (appearance !== view) dispatch(uiActions.setAppearance(view));
    };

    return (
        <div className={classNames("flex items-center gap-2", {}, [className])}>
            <Button
                theme="regularIcon"
                onClick={() => onSetAppearance("tile")}
                active={appearance === "tile"}
                disabled={disabled}
            >
                <Tile />
            </Button>
            <Button
                theme="regularIcon"
                onClick={() => onSetAppearance("list")}
                active={appearance === "list"}
                disabled={disabled}
            >
                <List />
            </Button>
        </div>
    );
});
