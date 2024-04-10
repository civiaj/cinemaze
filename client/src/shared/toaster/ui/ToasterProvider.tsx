import toast, { ToastIcon, Toaster, resolveValue } from "react-hot-toast";
import { Close } from "@/shared/assets/icons";

export const ToasterProvider = () => {
    return (
        <Toaster
            containerStyle={{ bottom: 8, left: 8 }}
            toastOptions={{ duration: 5000, position: "bottom-left" }}
        >
            {(t) => (
                <div
                    className={`min-h-10 rounded-xl px-4 py-2 flex items-center gap-2 bg-my-white shadow-md shadow-my-neutral-200 text-my-neutral-800 ${
                        t.visible ? "animate-enter" : "animate-leave"
                    } `}
                >
                    <ToastIcon toast={t} />
                    <p className="text-sm font-medium mr-2">{resolveValue(t.message, t)}</p>

                    <button
                        className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-my-neutral-200 shrink-0"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        <Close className="text-sm" />
                    </button>
                </div>
            )}
        </Toaster>
    );
};
