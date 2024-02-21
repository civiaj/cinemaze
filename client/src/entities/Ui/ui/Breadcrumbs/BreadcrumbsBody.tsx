import { useAppSelector } from "app/store";
import { useCallback, useEffect, useRef, useState } from "react";
import { ID_BREADCRUMBS } from "shared/const/const";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Box } from "shared/ui/Boxes/Box";

import { getBreadcrumbs } from "../../model/selectors";
import { Branches } from "../../ui/Breadcrumbs/Branches";
import { ExtraBreadcrumbs } from "../../ui/Breadcrumbs/ExtraBreadcrumbs";

export const BreadcrumbsBody = () => {
    const { details: branches, main } = useAppSelector(getBreadcrumbs);
    const [displayedIndex, setDisplayedIndex] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const collectionRef = useRef<Map<string, number> | null>(null);
    const initial = useRef(true);

    const getMap = () => {
        if (!collectionRef.current) collectionRef.current = new Map();
        return collectionRef.current;
    };

    const onResize = useCallback(() => {
        if (!collectionRef.current || !branches.length) return;

        const displayedBranches = branches.slice(displayedIndex);
        const nodeCollectionWidth = displayedBranches.reduce((acc, branch) => {
            const nodeWidth = getMap().get(branch.pathname);
            if (nodeWidth) {
                acc += nodeWidth;
            }
            return acc;
        }, 0);

        const containerWidth = containerRef.current?.offsetWidth ?? 0;

        let index = displayedIndex;
        let nodesWidth = nodeCollectionWidth;

        for (let i = 0; i < displayedBranches.length; i++) {
            if (nodesWidth > containerWidth) {
                const nodeWidth = getMap().get(branches[i].pathname);
                if (nodeWidth) {
                    nodesWidth -= nodeWidth;
                    index++;
                }
            }
        }

        if (displayedIndex > 0) {
            const extraNodeWidth = getMap().get(branches[displayedIndex - 1].pathname);
            if (extraNodeWidth) {
                const newWidth = nodeCollectionWidth + extraNodeWidth;
                if (newWidth < containerWidth) index--;
            }
        }

        setDisplayedIndex(index);
    }, [displayedIndex, branches]);

    useEffect(() => {
        if (initial.current) {
            onResize();
            initial.current = false;
        }
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
            initial.current = true;
        };
    }, [onResize]);

    console.log(initial.current);

    return (
        <Box
            className={"flex-row items-center whitespace-nowrap sm:py-2 py-2 sm:gap-4 gap-4 h-12"}
            id={ID_BREADCRUMBS}
        >
            {main && (
                <>
                    <AppLink
                        to={main.pathname}
                        className="hover:underline hover:text-blue-500 whitespace-nowrap font-medium shrink-0 text-lg"
                    >
                        {main.label}
                    </AppLink>
                </>
            )}

            {displayedIndex > 0 && <ExtraBreadcrumbs displayedIndex={displayedIndex} />}

            {!!branches.length && (
                <div ref={containerRef} className="w-full overflow-hidden">
                    <Branches branches={branches.slice(displayedIndex)} getMap={getMap} />
                </div>
            )}
        </Box>
    );
};
