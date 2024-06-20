import withFocusTrap from "@/shared/hoc/withFocusTrap";
import { classNames } from "@/shared/lib/classNames";
import { OutsideClickWrapper } from "@/shared/ui/Boxes/OutsideClickWrapper";
import { Overlay } from "@/shared/ui/Boxes/Overlay";
import { SearchInputFormProps } from "../../../model/types";
import { SearchInputBody } from "./SearchInputBody";
import { SearchInputForm } from "./SearchInputForm";

export const SearchInputActive = withFocusTrap(
    (
        props: SearchInputFormProps & {
            onSetInactive: () => void;
        }
    ) => {
        const { isActive, inputValue, handleStartSearch } = props;
        const { onSetInactive, ...inputProps } = props;
        return (
            <Overlay hideScroll className="z-[51]">
                <div
                    className={classNames("flex justify-center gap-2 flex-1 relative z-10", {
                        ["absolute top-2 left-2 right-2"]: isActive,
                    })}
                >
                    <OutsideClickWrapper
                        onClose={onSetInactive}
                        className="flex gap-2 justify-center relative flex-1 md:flex-initial"
                    >
                        <SearchInputForm {...inputProps} focused />
                        <SearchInputBody
                            inputValue={inputValue}
                            onSetInactive={onSetInactive}
                            handleStartSearch={handleStartSearch}
                        />
                    </OutsideClickWrapper>
                </div>
            </Overlay>
        );
    }
);
