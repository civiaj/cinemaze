import toast from "react-hot-toast";
import i18n from "@/shared/i18n/config";

function fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
}

export const copyClipboard = async (text: string) => {
    try {
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
        } else {
            await navigator.clipboard.writeText(text);
        }
        toast.success(i18n.t("toast.copy"), {
            id: text,
        });
    } catch (error) {
        let errorMessage = "";
        if (typeof error === "string") errorMessage = error;
        else if (error instanceof Error) errorMessage = error.message;
        toast.error(errorMessage);
    }
};
