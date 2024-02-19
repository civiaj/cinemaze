import { classNames } from "shared/lib/classNames";
import { FilmAwardsItemT } from "../model/types";

interface FilmAwardsListProps {
    awards: FilmAwardsItemT[];
    winner?: boolean;
}

export const FilmAwardsList = (props: FilmAwardsListProps) => {
    const { awards, winner } = props;
    return (
        <ul className="font-normal break-words relative">
            {awards.map((award, index) => (
                <li key={index} className="ml-4">
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
            <div
                className={classNames("absolute w-1 h-full bg-neutral-300 top-0 rounded-full", {
                    ["bg-blue-500"]: !!winner,
                })}
            />
        </ul>
    );
};
