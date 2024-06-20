import { UserBox } from "@/shared/ui/Boxes/UserBox";
import { Heading } from "@/shared/ui/Text/Heading";

type Props = {
    headerText: string;
};

export const ManageListItemActionsHeader = ({ headerText }: Props) => {
    return (
        <UserBox>
            <Heading headinglevel={3}>{headerText}</Heading>
        </UserBox>
    );
};
