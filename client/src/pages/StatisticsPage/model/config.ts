import { TThemes, getPreferableTheme } from "app/theme";

export const MAX_DISPLAYED = 10;
export const CATEGORY_HEIGHT = 30;
export const TICK_HEIGHT = 22;
export const LETTER_WIDTH = 8.3;
export const ANIMATION_DURATION = 300;
export const DARK = "rgb(245 245 245)";
export const LIGHT = "rgb(38 38 38)";
export const BLUE = "#3b82f6";
export const RADIAN = Math.PI / 180;
export const PIE_COLORS = [
    { pie: "#eff6ff", legend: "bg-blue-50", text: "rgb(17 24 39)" },
    { pie: "#dbeafe", legend: "bg-blue-100", text: "rgb(17 24 39)" },
    { pie: "#bfdbfe", legend: "bg-blue-200", text: "rgb(17 24 39)" },
    { pie: "#93c5fd", legend: "bg-blue-300", text: "rgb(17 24 39)" },
    { pie: "#60a5fa", legend: "bg-blue-400", text: "white" },
    { pie: "#3b82f6", legend: "bg-blue-500", text: "white" },
    { pie: "#2563eb", legend: "bg-blue-600", text: "white" },
    { pie: "#1d4ed8", legend: "bg-blue-700", text: "white" },
    { pie: "#1e40af", legend: "bg-blue-800", text: "white" },
    { pie: "#172554", legend: "bg-blue-900", text: "white" },
];
export const ANIMATION_BEGIN = 0;
export const COLORS: Record<TThemes, string> = {
    dark: DARK,
    light: LIGHT,
    system: getPreferableTheme() === "dark" ? DARK : LIGHT,
};
export const MARGIN = { top: 10, left: 30, right: 50, bottom: 10 };
