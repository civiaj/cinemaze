import { Locale } from "date-fns";
import { arSA, enUS, fr, ko, ru } from "date-fns/locale";
import { ForwardedRef, forwardRef } from "react";
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from "react-datepicker";
import "react-datepicker/src/stylesheets/datepicker.scss";
import { useTranslation } from "react-i18next";
import { formatDate } from "shared/lib/formatDate";
import { Button } from "shared/ui/Button/Button";

import { Left, Right } from "shared/assets/icons";
import { TLngs } from "shared/i18n/types";
import "./date-picker.css";

const datePickerLocales: Record<TLngs, Locale> = {
    ar: arSA,
    en: enUS,
    fr: fr,
    ko: ko,
    ru: ru,
};

Object.entries(datePickerLocales).forEach(([key, locale]) => registerLocale(key, locale));

const DateInput = forwardRef(
    (
        { value, onClick }: { value?: string | null; onClick?: () => void },
        ref?: ForwardedRef<HTMLButtonElement>
    ) => {
        const { t, i18n } = useTranslation();
        return (
            <Button theme="regular" className="text-sm h-auto" onClick={onClick} ref={ref}>
                {value ? (
                    formatDate(new Date(value), i18n.language)
                ) : (
                    <span className="text-my-neutral-500">{t("manage.ban-date-default")}</span>
                )}
            </Button>
        );
    }
);

export const AppDatePicker = (props: ReactDatePickerProps) => {
    const { i18n } = useTranslation();

    return (
        <ReactDatePicker
            locale={i18n.language}
            showDisabledMonthNavigation
            nextMonthButtonLabel={<Right className="shrink-0" />}
            previousMonthButtonLabel={<Left className="shrink-0" />}
            customInput={<DateInput />}
            {...props}
        />
    );
};
