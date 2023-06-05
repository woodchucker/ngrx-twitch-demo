import { AppState } from './app.module';
import { Item } from './model/item';
import { addItem, deleteItem, loadItems } from './store/items.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getItems, getItemsError } from './store/items.selectors';


@Component({
  selector: 'fdt-root',
  template: `
  <div *ngIf="itemsError$ | async"> C'è un errore </div>
  <form #f="ngForm" (submit)="addItemHandler(f.value)">
    <input type="text" name="name" [ngModel]>
  </form>
  <li *ngFor="let item of (items$ | async)">
    {{item.name}}
    <ng-container *ngIf="item.id">
      <button (click)="deleteItemHandler(item.id)">Delete</button>
    </ng-container>

  </li>
  <!-- <button (click)="addItemHandler()">Add</button> -->
  `,
  styles: []
})
export class AppComponent implements OnInit{
  items$: Observable<Item[]> = this.store.select(getItems);
  itemsError$: Observable<boolean> = this.store.select(getItemsError);
  items: Item[] = [];

  constructor(private store: Store<AppState>) { }
  ngOnInit(): void {
    this.store.dispatch(loadItems());
  }

  addItemHandler(item: Omit<Item, 'id'>): void {
    const formData = { ...item};
    this.store.dispatch(addItem({ item: formData}));
  }

  deleteItemHandler(id: number): void {
    this.store.dispatch(deleteItem({ id}));
  }

}
