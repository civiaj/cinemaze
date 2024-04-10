import { Heading } from "@/shared/ui/Text/Heading";

type Props = {
    headerText: string;
};

export const ManageListItemActionsHeader = ({ headerText }: Props) => {
    return (
        <Heading className="font-medium" headinglevel={4}>
            {headerText}
        </Heading>
    );
};
