import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { filmActions } from "@/entities/Film";
import { TAppearances, TAppearancesRecord, getUiAppearance, uiActions } from "@/entities/Ui";
import { Checked } from "@/shared/assets/icons";
import { Button } from "@/shared/ui/Button/Button";
import { Elipsis } from "@/shared/ui/Text/Elipsis";
import { options } from "../../model/options";

const appearances = options.appearance.variants as TAppearancesRecord;

export const NavbarAppearance = () => {
    const appearance = useAppSelector(getUiAppearance);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const onAppearanceChange = (newValue: TAppearances) => {
        window.scrollTo({ top: 0 });
        dispatch(filmActions.clean());
        dispatch(uiActions.setAppearance(newValue));
    };

    return (
        <ul className="flex flex-col py-2">
            {Object.keys(appearances).map((appearanceKey) => {
                const item = appearances[appearanceKey as TAppearances];
                return (
                    <li key={appearanceKey}>
                        <Button
                            onClick={() => onAppearanceChange(item.value)}
                            theme="popup"
                            className="gap-4 py-2 text-base w-full justify-start"
                        >
                            <span className="w-8 flex items-center justify-center text-xl shrink-0">
                                {appearance === appearanceKey && <Checked />}
                            </span>
                            <Elipsis>{t(item.label as string)}</Elipsis>
                        </Button>
                    </li>
                );
            })}
        </ul>
    );
};
