import { useTranslation } from "react-i18next";
import { Checked } from "@/shared/assets/icons";
import { TLngs, TLngsRecord } from "@/shared/i18n/types";
import { Button } from "@/shared/ui/Button/Button";
import { Elipsis } from "@/shared/ui/Text/Elipsis";
import { options } from "../../model/options";

const languages = options.language.variants as TLngsRecord;

export const NavbarLang = () => {
    const { t, i18n } = useTranslation();

    return (
        <ul className="flex flex-col py-2">
            {Object.keys(languages).map((langKey) => {
                const item = languages[langKey as TLngs];
                return (
                    <li key={langKey}>
                        <Button
                            onClick={() => i18n.changeLanguage(langKey)}
                            theme="popup"
                            className="gap-4 py-2 text-base w-full justify-start"
                        >
                            <span className="w-8 flex items-center justify-center text-xl shrink-0">
                                {i18n.language === langKey && <Checked />}
                            </span>
                            <Elipsis>{t(item.label as string)}</Elipsis>
                        </Button>
                    </li>
                );
            })}
        </ul>
    );
};
