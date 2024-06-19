import { ReactNode } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import withFocusTrap from "@/shared/hoc/withFocusTrap";
import withPopup from "@/shared/hoc/withPopup";

type ListProps = {
    render: (value: ListChildComponentProps) => ReactNode;
    itemHeight?: number;
    maxDisplayedItems?: number;
    width?: number | string;
    itemCount: number;
};

const List = (props: ListProps) => {
    const { render, itemCount, itemHeight = 40, maxDisplayedItems = 5, width = "100%" } = props;

    return (
        <FixedSizeList
            itemSize={itemHeight}
            height={itemHeight * (maxDisplayedItems > itemCount ? itemCount : maxDisplayedItems)}
            itemCount={itemCount}
            width={width}
        >
            {render}
        </FixedSizeList>
    );
};

interface PopupListProps extends ListProps {
    className?: string;
    maxDisplayedItems?: number;
    transitionValue: boolean | string;
}

export const PopupList = (props: PopupListProps) => {
    const ComponentWithPopup = withPopup<PopupListProps>(List, {
        transitionValue: props.transitionValue,
        className: `flex flex-col mt-2 rounded-xl absolute overflow-hidden border border-my-neutral-200 bg-my-white shadow-md shadow-my-neutral-200 ${props.className}`,
    });

    const ComponentWithPopupAndFocus = withFocusTrap(ComponentWithPopup);

    return <ComponentWithPopupAndFocus {...props} />;
};
