import { AppState } from './app.module';
import { getItems } from './store/items.selector';
import { Item } from './model/item';
import { addItem, deleteItem } from './store/items.actions';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'fdt-root',
  template: `
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
export class AppComponent {
  items$: Observable<Item[]> = this.store.select(getItems);
  items: Item[] = [];

  constructor(private store: Store<AppState>) { }

  addItemHandler(item: Omit<Item, 'id'>): void {
    const formData = { id: Date.now(), ...item};
    this.store.dispatch(addItem({ item: formData}));
  }

  deleteItemHandler(id: number): void {
    this.store.dispatch(deleteItem({ id}));
  }

}
