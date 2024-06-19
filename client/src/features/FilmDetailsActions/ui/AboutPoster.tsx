import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames";
import { AppImage } from "@/shared/ui/AppImage/AppImage";
import { Button } from "@/shared/ui/Button/Button";

interface PosterProps {
    posterUrl?: string;
    link?: string;
    className?: string;
}

export const AboutPoster = (props: PosterProps) => {
    const { posterUrl, link, className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames("flex flex-col gap-2 relative", {}, [className])}>
            <div className="relative overflow-hidden aspect-[9/16] rounded-xl">
                <AppImage src={posterUrl} alt="poster" className="select-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-transparent to-50% z-[1] rounded-b-xl vsm:hidden" />
            </div>
            {link && (
                <form
                    id="open-kp-form"
                    className="absolute z-[2] bottom-2 right-2 left-2 vsm:static"
                >
                    <Button
                        type="submit"
                        formTarget="_blank"
                        formAction={link}
                        className="w-full"
                        theme="blue"
                    >
                        {t("btn.to-kp")}
                    </Button>
                </form>
            )}
        </div>
    );
};
