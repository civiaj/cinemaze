import { forwardRef, ForwardedRef } from "react";
import { useTranslation } from "react-i18next";
import "react-datepicker/src/stylesheets/datepicker.scss";
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from "react-datepicker";
import { ru, enUS } from "date-fns/locale";
import { formatDate } from "shared/lib/formatDate";
import { Button } from "shared/ui/Button/Button";

import "./date-picker.css";
import { Left, Right } from "shared/assets/icons";

registerLocale("ru", ru);
registerLocale("en", enUS);

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

const DateInput = forwardRef(
    (
        { value, onClick }: { value?: string | null; onClick?: () => void },
        ref?: ForwardedRef<HTMLButtonElement>
    ) => {
        const { i18n } = useTranslation();
        return (
            <Button theme="regular" className="text-sm h-auto" onClick={onClick} ref={ref}>
                {value ? (
                    formatDate(new Date(value), i18n.language)
                ) : (
                    <span className="text-my-neutral-500">Выберите значение...</span>
                )}
            </Button>
        );
    }
);
