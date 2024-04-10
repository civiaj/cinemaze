import { useCallback, useState } from "react";
import { GetFilmImagesType } from "../../model/types";
import { FilmImagesBody } from "./FilmImagesBody";
import { FilmImagesHeader } from "./FilmImagesHeader";

interface FilmImagesProps {
    filmId: number;
}

export const FilmImages = ({ filmId }: FilmImagesProps) => {
    const [type, setType] = useState<GetFilmImagesType>("STILL");
    const [page, setPage] = useState(1);

    const handleTypeChange = useCallback((newType: GetFilmImagesType) => {
        setType(newType);
        setPage(1);
    }, []);

    const handlePageChange = useCallback((newPage: number) => setPage(newPage), []);

    return (
        <div className="flex flex-col gap-4">
            <FilmImagesHeader value={type} setNewType={handleTypeChange} />
            <FilmImagesBody type={type} id={filmId} changePage={handlePageChange} page={page} />
        </div>
    );
};
