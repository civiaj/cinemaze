export const formats = ["jpg", "png", "jpeg", "webp"];
export const acceptInput = formats.map((format) => `image/${format}`).join(", ");
export const CROP_MIN_WIDTH = 250;
export const CROP_ASPECT = 1;
export const formatError = {
    type: "Поддерживаемые форматы: JPG, PNG, JPEG, WEBP",
    size: "Минимальный размер изображения 250 x 250 пикселей.",
};
