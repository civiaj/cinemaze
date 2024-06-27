import { useTranslation } from "react-i18next";
import { TFilm } from "@/entities/Film/model/types";
import { Box } from "@/shared/ui/Boxes/Box";
import { FilmCard } from "@/shared/ui/FilmCard";
import { Slider } from "@/shared/ui/Slider";
import { Heading } from "@/shared/ui/Text/Heading";
import { similarsSliderSettings } from "../model/data";
import { useSimilarsQuery } from "../model/filmApi";

interface SimilarsProps {
    id: number;
}

const cardStyles: TCardStyles = { card: "h-60", label: "text-base", title: "text-sm" };

export const Similars = (props: SimilarsProps) => {
    const { id } = props;
    const { data } = useSimilarsQuery(id);
    const { t } = useTranslation();

    return data?.items.length ? (
        <Box>
            <Heading headinglevel={3}>{t("details.similar-t")}</Heading>
            <Slider
                key={id}
                className="py-2"
                render={(item) => (
                    <FilmCard
                        label={t("card.t-go")}
                        film={item as TFilm}
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
