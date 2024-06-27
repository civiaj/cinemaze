import { useCallback, useState } from "react";
import { TImagesCategories } from "../../model/types";
import { FilmImagesBody } from "./FilmImagesBody";
import { FilmImagesHeader } from "./FilmImagesHeader";

interface FilmImagesProps {
    id: number;
}

export const FilmImages = ({ id }: FilmImagesProps) => {
    const [type, setType] = useState<TImagesCategories>("STILL");
    const [page, setPage] = useState(1);

    const handleTypeChange = useCallback((newType: TImagesCategories) => {
        setType(newType);
        setPage(1);
    }, []);

    const handlePageChange = useCallback((newPage: number) => setPage(newPage), []);

    return (
        <div className="flex flex-col gap-4">
            <FilmImagesHeader value={type} setNewType={handleTypeChange} />
            <FilmImagesBody type={type} id={id} changePage={handlePageChange} page={page} />
        </div>
    );
};
