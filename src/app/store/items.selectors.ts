import { AppState } from "../app.module";
import { Item } from "../model/item";

export const getItems = (state: AppState): Item[] => state.items.list;
export const getItemsError = (state: AppState): boolean => state.items.error;
