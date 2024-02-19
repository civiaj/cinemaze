import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export const HeaderWithControlls = ({ children }: Props) => {
    return (
        <div className="justify-between flex flex-col items-start sm:items-center gap-2 sm:flex-row">
            {children}
        </div>
    );
};
