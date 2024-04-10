import { useCallback, useState } from "react";
import { ImagePreview } from "@/widgets/ImagePreview";
import { useGetFilmImagesQuery } from "@/entities/FilmDetails/model/filmDetailsApi";
import formatFilmError from "@/shared/api/helpers/formatFilmError";
import { ID_VIEW_SWITCHER } from "@/shared/const/const";
import { StatusBox } from "@/shared/ui/Boxes/StatusBox";
import { Pagination } from "@/shared/ui/Pagination/Pagination";
import { Spinner } from "@/shared/ui/Spinner/Spinner";
import { GetFilmImagesType } from "../../model/types";
import { FilmImage } from "./FilmImage";
import { FilmImagesEmpty } from "./FilmImagesEmpty";

interface FilmImagesBodyProps {
    id: number;
    type: GetFilmImagesType;
    changePage: (newPage: number) => void;
    page: number;
}

export const FilmImagesBody = (props: FilmImagesBodyProps) => {
    const { id, type, page, changePage } = props;
    const { data, isLoading, isFetching, isError, error } = useGetFilmImagesQuery({
        id,
        page,
        type,
    });

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const handlePreviewClose = useCallback(() => setActiveIndex(null), []);
    const handlePreviewOpen = useCallback((index: number) => setActiveIndex(index), []);

    if (isError)
        return (
            <div className="flex items-center flex-col gap-2">
                <StatusBox isError={isError} msgOrChildren={formatFilmError(error)} withoutBox />
            </div>
        );

    if (isLoading || isFetching)
        return (
            <div className="h-20 flex items-center justify-center">
                <Spinner />
            </div>
        );

    if (!data?.items.length)
        return (
            <div className="h-20 flex items-center justify-center">
                <FilmImagesEmpty type={type} />
            </div>
        );

    return (
        <>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 grid-flow-dense auto-rows-[4rem]">
                {data.items.map((image, index) => (
                    <FilmImage
                        key={image.previewUrl}
                        previewUrl={image.previewUrl}
                        imageUrl={image.imageUrl}
                        index={index}
                        handlePreviewOpen={handlePreviewOpen}
                    />
                ))}
            </ul>
            <Pagination
                activePage={page}
                changePage={changePage}
                numOfPages={data.totalPages}
                scrollTo={ID_VIEW_SWITCHER}
            />

            {activeIndex !== null && (
                <ImagePreview
                    activeIndex={activeIndex}
                    images={data.items}
                    onClose={handlePreviewClose}
                />
            )}
        </>
    );
};
