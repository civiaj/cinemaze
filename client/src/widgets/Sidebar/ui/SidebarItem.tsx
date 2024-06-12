import { useTranslation } from "react-i18next";
import { NavLink, NavLinkProps } from "react-router-dom";
import { SideBarItem } from "../model/types";
import { memo } from "react";

type Props = SideBarItem & NavLinkProps;

export const SidebarItem = memo((props: Props) => {
    const { Icon, label, ...otherProps } = props;
    const cls = "flex items-center justify-start gap-3 px-4 h-10 text-lg rounded-xl";
    const clsInactive = cls + " " + "hover:bg-my-neutral-200";
    const clsActive = cls + " " + "bg-my-neutral-200  [&>svg]:text-blue-500";
    const { t } = useTranslation();

    return (
        <li>
            <NavLink
                className={({ isActive }) => (isActive ? clsActive : clsInactive)}
                {...otherProps}
            >
                <Icon className="text-xl" />
                <span>{t(label)}</span>
            </NavLink>
        </li>
    );
});
