import i18n from "@/shared/i18n/config";

export const formats = ["jpg", "png", "jpeg", "webp", "heic"];
export const acceptInput = formats.map((format) => `image/${format}`).join(", ");
export const CROP_MIN_WIDTH = 250;
export const CROP_ASPECT = 1;
export const formatError = {
    type: i18n.t("user.photo-format-msg"),
    size: i18n.t("user.photo-size-msg"),
};
