import { Item } from '../model/item';
import { addItem, deleteItem } from './items.actions';
import { createReducer, on } from '@ngrx/store';

const initialState :Item[]= [
  { id:1, name:'Pane' },
  { id:2, name:'Nutella' },
  { id:3, name:'Latte' }
];

export const itemsReducer = createReducer(
  initialState,
  on(addItem, (state, action) => [...state, action.item]),
  on(deleteItem, (state, action) => state.filter(item => item.id !== action.id))
)
