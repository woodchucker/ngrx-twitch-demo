import { Item } from '../model/item';
import { createAction, props } from '@ngrx/store';

export const addItem = createAction(
  '[item] add',
  //action payload
  // props< { item: Item} >()
  props< { item: Omit<Item, 'id'>} >()
);
export const addItemSuccess = createAction(
  '[item] addSuccess',
  //action payload
  props< { item: Item} >()
);
export const deleteItem = createAction(
  '[item] delete',
  //action payload
  props< { id: number} >()
);
