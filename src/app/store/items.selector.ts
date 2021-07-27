import { Item } from './../model/item';
import { AppState } from './../app.module';
import { createSelector } from '@ngrx/store';

export const getItems = (state: AppState) => state.items;

