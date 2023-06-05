import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addItem, addItemFail, addItemSuccess, deleteItem, deleteItemFail, deleteItemSuccess, loadItems, loadItemsFail, loadItemsSuccess } from "./items.actions";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators"
import { Item } from "../model/item";
import { fromEvent, of } from "rxjs";

// before use: npm install @ngrx/effects
@Injectable()
export class ItemsEffects {
  resize$ = createEffect(() => fromEvent(document, 'resize').pipe(
    //Todo dispatch di un'azione resize
    //Non è legato esclusivamente agli eventi di ngrx
  ));
  loadItems$ = createEffect(() => this.actions$.pipe(
    ofType(loadItems),
    switchMap(() => this.http.get<Item[]>('http://localhost:3000/items')
      .pipe(
        map(items => loadItemsSuccess({ items })),
        catchError( _ => of(loadItemsFail()))
      )
    )
  ));
  addItems$ = createEffect(() => this.actions$.pipe(
    ofType(addItem),
    mergeMap(action => this.http.post<Item>('http://localhost:3000/items', action.item)
      .pipe(
        map(item => addItemSuccess({ item })),
        catchError( _ => of(addItemFail()))
      )
    )
  ));
  deleteItem$ = createEffect(() => this.actions$.pipe(
    ofType(deleteItem),
    mergeMap(({id}) => this.http.delete<Item>(`http://localhost:3000/items/${id}`)
      .pipe(
        map(_ => deleteItemSuccess({ id })),
        catchError( _ => of(deleteItemFail()))
      )
    )
  ));
  deleteItemSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(deleteItemSuccess),
    tap(_ => alert('redirect'))
   ), { dispatch: false} // se non voglio dispacciare un'azione ad esempio voglio fare una redirect
  );
  constructor(
    private http: HttpClient,
    private actions$: Actions
  ) {

  }

}
