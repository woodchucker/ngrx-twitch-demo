import { Item } from './model/item';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { itemsReducer } from './store/items.reducers';

export interface AppState {
  items: Item[];
  auth: { token: string, role: string};
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {
        // oggetti modificabili dai reducers che ascoltano le actions aggiornano lo store
        // le ingo saranno recuperabili con dei selector
        // side effects simile ai reducer ascolta le action aggiorna il server
        // reducer inizializza e muta lo store
        items: itemsReducer,
        auth: () => [{
          token: 'abc123',
          role: 'admin'
        }]
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge:25
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
