import { classNames } from "@/shared/lib/classNames";
import { TAwardsUnit } from "../../model/types";

interface FilmAwardsListProps {
    awards: TAwardsUnit[];
    winner?: boolean;
}

export const FilmAwardsList = (props: FilmAwardsListProps) => {
    const { awards, winner } = props;
    return (
        <div className="grid grid-cols-[4px,_auto] gap-4">
            <div
                className={classNames("bg-neutral-300 top-0 rounded-full", {
                    ["bg-blue-500"]: winner,
                })}
            />
            <ul className="font-normal break-words">
                {awards.map((award, index) => (
                    <li key={index}>
                        <span className="text-my-neutral-500">{award.nominationName}</span>
                        {!!award.persons.length && (
                            <>
                                <span>: </span>
                                <span className="text-my-neutral-800 font-medium">
                                    {award.persons
                                        .map((person) => person.nameRu || person.nameEn)
                                        .join(", ")}
                                </span>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
