import { Box } from "shared/ui/Boxes/Box";
import { Heading } from "shared/ui/Text/Heading";
import { FilmCard } from "widgets/FilmCard";
import { Slider } from "widgets/Slider";
import { similarsSliderSettings } from "../model/data";
import { useSimilarsQuery } from "../model/similarsApi";

interface SimilarsProps {
    filmId: number;
}

const cardStyles: TCardStyles = { card: "h-60", label: "text-base", title: "text-sm" };

export const Similars = (props: SimilarsProps) => {
    const { filmId } = props;
    const { data } = useSimilarsQuery(filmId);

    return data?.items.length ? (
        <Box>
            <Heading headinglevel={3}>Если вам понравился этот фильм</Heading>
            <Slider
                key={filmId}
                className="py-2"
                render={(item) => (
                    <FilmCard
                        label="Перейти"
                        film={item as FilmT}
                        cardStyles={cardStyles}
                        hideStats
                        appearance="tile"
                    />
                )}
                slides={data.items}
                {...similarsSliderSettings}
            />
        </Box>
    ) : null;
};
