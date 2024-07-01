import { TFavorites } from "@/entities/Film";

export type ViewSwitcherTypes = "description" | "images" | "awards";
export type UpdateFavorite = (payload: TFavorites, key: keyof TFavorites) => Promise<void>;
