import { Item } from './model/item';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionReducerMap, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { ItemState, itemsReducer } from './store/items.reducers';
import {  HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ItemsEffects } from './store/items.effects';

export interface AppState {
  items: ItemState;
  // auth: { token: string, role: string};
}

// Tipizzazione del reducer
export const reducers: ActionReducerMap<AppState> = {
  items: itemsReducer,
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    // oggetti modificabili dai reducers che ascoltano le actions aggiornano lo store
    // le info saranno recuperabili con dei selector
    // side effects simile ai reducer ascolta le action aggiorna il server
    // reducer inizializza e muta lo store
    StoreModule.forRoot(
      reducers, // tipizzazione reducer
      //
      // {
      //   items: itemsReducer,
        // auth: () => [{
        //   token: 'abc123',
        //   role: 'admin'
        // }]
      // }
    ),
    StoreDevtoolsModule.instrument({
      maxAge:25
    }),
    EffectsModule.forRoot([ItemsEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
