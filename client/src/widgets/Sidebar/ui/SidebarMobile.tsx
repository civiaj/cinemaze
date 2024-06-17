import { useLocation } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useAppSelector } from "@/app/store";
import { getSidebarItems } from "../model/selectors";
import { SidebarItem } from "./SidebarItem";

export const SidebarMobile = () => {
    const sidebarItems = useAppSelector(getSidebarItems);
    const { pathname } = useLocation();

    if (pathname.includes(routePath.login)) return null;

    return (
        <div className="fixed sm:hidden bottom-0 left-0 w-full bg-my-neutral-50 z-10 backdrop-blur-sm h-12 border-t border-border">
            <ul className="flex w-full h-full">
                {sidebarItems.map((sidebarItem) => (
                    <SidebarItem {...sidebarItem} key={sidebarItem.label} isMobile />
                ))}
            </ul>
        </div>
    );
};
