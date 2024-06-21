import { Area } from "react-easy-crop";

export function getPreviewCanvas(
    image: HTMLImageElement | undefined | null = undefined,
    canvas: HTMLCanvasElement | null,
    crop?: Area
) {
    if (!canvas) {
        throw new Error("No canvas");
    }
    const ctx = canvas.getContext("2d");

    if (!ctx || !image || !crop) {
        throw new Error("No ctx, image or crop");
    }

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        canvas.width,
        canvas.height
    );
}
