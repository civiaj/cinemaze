import { useEffect, useState } from "react";
import { Right } from "shared/assets/icons";
import { classNames } from "shared/lib/classNames";
import { AppLink } from "shared/ui/AppLink/AppLink";

import { BreadcrumbsT } from "../../model/types";

type Props = {
    getMap: () => Map<string, number>;
    branches: BreadcrumbsT[];
};

export const Branches = (props: Props) => {
    const { branches, getMap } = props;
    const [isVisible, setIsVisible] = useState(false);

    const isLast = (branch: BreadcrumbsT) =>
        branch.pathname === branches[branches.length - 1].pathname;

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <ul className="flex h-full">
            {branches.map((branch) => (
                <li
                    key={branch.pathname}
                    ref={(node) => {
                        if (node) getMap().set(branch.pathname, node.offsetWidth);
                    }}
                >
                    <AppLink
                        className={classNames(
                            "hover:text-blue-500 hover:bg-my-neutral-200 flex items-center gap-1 bg-my-neutral-100 rounded-full px-2 h-8 text-sm ml-2 opacity-0 transition-opacity",
                            {
                                ["bg-blue-500 text-neutral-50 pointer-events-none"]: isLast(branch),
                                ["opacity-100"]: isVisible,
                            }
                        )}
                        to={branch.pathname}
                    >
                        {branch.label}
                        {!isLast(branch) && <Right className="text-xl" />}
                    </AppLink>
                </li>
            ))}
        </ul>
    );
};
