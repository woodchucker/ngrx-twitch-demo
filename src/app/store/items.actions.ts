import { createAction, props } from '@ngrx/store';
import { Item } from '../model/item';
export const addItem = createAction(
  '[items] add',
  props<{ item: Omit<Item, 'id'> }>()
);

export const deleteItem = createAction(
  '[items] delete',
  props<{ id: number }>()
);
