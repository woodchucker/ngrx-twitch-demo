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

// azioni di successo fallimento di chiamate ad un servizio
// usiamo solo in dev dependency non in sviluppo json-server come mock
// npm install json-server --save-dev
export const addItemSuccess = createAction(
  '[items] add success',
  props<{ item: Omit<Item, 'id'> }>()
);
export const addItemFail = createAction(
  '[items] add fail',
);
export const loadItems = createAction(
  '[items] load',
);
export const loadItemsSuccess = createAction(
  '[items] load success',
  props<{ items: Item[] }>()
);
export const loadItemsFail = createAction(
  '[items] load fail',
);

export const deleteItemSuccess = createAction(
  '[items] delete success',
  props<{ id: number }>()
);
export const deleteItemFail = createAction(
  '[items] delete fail',
);
