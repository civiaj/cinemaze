import { DoubleLeft, DoubleRight, Left, Right } from "shared/assets/icons";
import { classNames } from "shared/lib/classNames";
import { Button } from "shared/ui/Button/Button";

interface PaginationProps {
    numOfPages?: number;
    className?: string;
    activePage: number;
    changePage: (newPage: number) => void;
    btnClassName?: string;
    disabled?: boolean;
    scrollTo?: string;
}

const getStartEndPages = (activePage: number, numOfPages: number) => {
    let start: number;
    let end: number;
    const step = 2;

    start = activePage > step ? activePage - step : 1;

    if (start === 1 && numOfPages >= 5) end = 5;
    else if (start === 1 && numOfPages < 5) end = numOfPages;
    else end = activePage + step > numOfPages ? numOfPages : activePage + step;

    if (end === numOfPages && numOfPages >= 5) start = end - 4;
    else if (end === numOfPages && numOfPages < 5) start = 1;

    return [start, end];
};

export const Pagination = (props: PaginationProps) => {
    const {
        numOfPages = 1,
        className,
        activePage,
        changePage,
        btnClassName,
        disabled,
        scrollTo,
    } = props;
    const [start, end] = getStartEndPages(activePage, numOfPages);

    const onPageChange = (newPage: number) => {
        if (newPage === activePage) return;
        changePage(newPage);
        if (scrollTo) {
            document.getElementById(scrollTo)?.scrollIntoView(true);
        }
    };

    return (
        <div className={classNames("flex-1 flex justify-center gap-2", {}, [className])}>
            {activePage > 2 && (
                <Button disabled={disabled} onClick={() => onPageChange(1)} theme="pagination">
                    <DoubleLeft className="text-lg" />
                </Button>
            )}
            {activePage > 1 && (
                <>
                    <Button
                        disabled={disabled}
                        onClick={() => onPageChange(activePage - 1)}
                        theme="pagination"
                    >
                        <Left className="text-lg" />
                    </Button>
                </>
            )}
            <ul className="flex justify-center gap-1 items-center">
                {Array(numOfPages)
                    .fill(0)
                    .map((_, i) => i + 1)
                    .slice(start - 1, end)
                    .map((page) => (
                        <li key={page}>
                            <Button
                                disabled={disabled}
                                onClick={() => onPageChange(page)}
                                active={activePage === page}
                                theme="pagination"
                                className={classNames(
                                    "text-base h-10 w-10 p-0 justify-center",
                                    {},
                                    [btnClassName]
                                )}
                            >
                                {page}
                            </Button>
                        </li>
                    ))}
            </ul>
            {activePage < numOfPages && (
                <Button
                    disabled={disabled}
                    theme="pagination"
                    onClick={() => onPageChange(activePage + 1)}
                >
                    <Right className="text-lg" />
                </Button>
            )}
            {activePage <= numOfPages - 2 && (
                <Button
                    disabled={disabled}
                    theme="pagination"
                    onClick={() => onPageChange(numOfPages)}
                >
                    <DoubleRight className="text-lg" />
                </Button>
            )}
        </div>
    );
};
