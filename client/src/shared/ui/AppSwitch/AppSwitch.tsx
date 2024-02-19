import { ReactNode } from "react";
import { classNames } from "shared/lib/classNames";
import { Text } from "shared/ui/Text/Text";

type Props = {
    checked: boolean;
    onChange: () => void;
    sameChecked?: boolean;
    label?: ReactNode;
    className?: string;
};

export const AppSwitch = (props: Props) => {
    const { onChange, checked, sameChecked = false, label, className } = props;

    return (
        <label className={classNames("flex items-center cursor-pointer gap-4", {}, [className])}>
            {label && <Text className="font-medium">{label}</Text>}
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={checked}
                    onChange={onChange}
                />
                <div
                    className={classNames(
                        "w-11 h-6 bg-neutral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-my-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-my-white after:border-my-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 outline-none peer-focus:ring-2 ring-my-neutral-800 transition-all",
                        { ["bg-blue-500"]: sameChecked }
                    )}
                />
            </div>
        </label>
    );
};
