import { createReducer, on } from '@ngrx/store';
import { addItemSuccess, deleteItemSuccess, loadItemsFail, loadItemsSuccess } from './items.actions';
import { Item } from '../model/item';

export interface ItemState {
  list: Item[],
  error: boolean
}
const initialState: ItemState = {
  list: [],
  error: false
}
export const itemsReducer = createReducer(
    initialState,
    //il return dei reducer non sono tipizzati posso mettere dopo => quello che voglio
    on(loadItemsFail, (state, action) => ({ error: true, list:[...state.list]})),
    on(loadItemsSuccess, (state, action) => ({ error: false, list:[...state.list, ...action.items]})),
    on(addItemSuccess, (state, action) => ({ error: false, list:[...state.list, action.item]})),
    on(deleteItemSuccess, (state, action) => ({ error: false, list:state.list.filter(item => item.id !== action.id)})),
  );
