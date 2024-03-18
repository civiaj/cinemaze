import { Box } from "shared/ui/Boxes/Box";
import { Text } from "shared/ui/Text/Text";

type Props = {
    text?: string;
};

export const EndBox = ({ text = "Вы достигли конца списка." }: Props) => {
    return (
        <Box className="text-center py-4 sm:py-4">
            <Text>{text}</Text>
        </Box>
    );
};
