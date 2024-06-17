import { memo } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, NavLinkProps } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames";
import { SideBarItem } from "../model/types";

type Props = SideBarItem & NavLinkProps & { isMobile?: boolean };

export const SidebarItem = memo((props: Props) => {
    const { Icon, label, isMobile, ...otherProps } = props;
    const { t } = useTranslation();

    return (
        <li className={classNames("", { ["w-full"]: isMobile })}>
            <NavLink
                className={({ isActive }) =>
                    classNames(
                        "flex items-center justify-start gap-3 px-4 h-10 text-lg rounded-xl hover:bg-my-neutral-200",
                        {
                            ["bg-my-neutral-200 [&>svg]:text-blue-500"]: isActive,
                            ["h-full rounded-none w-full flex items-center justify-center"]:
                                isMobile,
                        }
                    )
                }
                {...otherProps}
            >
                <Icon className="text-xl" />
                {!isMobile && <span>{t(label)}</span>}
            </NavLink>
        </li>
    );
});
