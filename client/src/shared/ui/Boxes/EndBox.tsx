import { Box } from "shared/ui/Boxes/Box";
import { Text } from "shared/ui/Text/Text";

type Props = {
    text?: string;
};

export const EndBox = ({ text = "Вы достигли конца списка." }: Props) => {
    return (
        <Box className="text-center py-2 sm:py-2">
            <Text className="font-medium">{text}</Text>
        </Box>
    );
};
