import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { environment } from '../environments/environment';
import { ActionReducer, ActionReducerMap, MetaReducer, StoreModule } from "@ngrx/store";
import { postReducer } from "./redux/reducers/post.reducer";
import { textReducer } from "./redux/reducers/text.reducer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { localStorageSync } from "ngrx-store-localstorage";
import { Post } from './models/Post';
import { Text } from './models/Text';
import * as CryptoJS from 'crypto-js'; // Importa la libreria "crypto-js"

// Definizione dell'interfaccia dello stato dell'applicazione
export interface IState {
  post: Post;
  text: Text
}

// Definizione dei reducers utilizzati nell'applicazione
const reducers: ActionReducerMap<IState> = {
  post: postReducer,
  text: textReducer
};

// Funzione per crittografare i dati utilizzando "crypto-js"
function encrypt(data: any): string {
  return CryptoJS.AES.encrypt(JSON.stringify(data), environment.secretKey).toString();
}

// Funzione per decrittografare i dati utilizzando "crypto-js"
function decrypt(data: string): any {
  const bytes = CryptoJS.AES.decrypt(data, environment.secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

// Funzione per sincronizzare lo stato con il local storage e crittografarlo
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [
      {
        'post': {
          encrypt: state => encrypt(state), // Crittografia dello stato 'post' utilizzando "crypto-js"
          decrypt: state => decrypt(state)  // Decrittografia dello stato 'post' utilizzando "crypto-js"
        }
      },
      {
        'text': {
          encrypt: state => encrypt(state), // Crittografia dello stato 'text' utilizzando "crypto-js"
          decrypt: state => decrypt(state)  // Decrittografia dello stato 'text' utilizzando "crypto-js"
        }
      }
    ],
    rehydrate: true
  })(reducer);
}

// Array di meta-reducers, che include il reducer per la sincronizzazione con il local storage
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterLink,
    StoreModule.forRoot(reducers, {metaReducers}), // Configurazione dello store con i reducers e i meta-reducers
    StoreDevtoolsModule.instrument({
      maxAge: 10 // Configurazione di StoreDevtools per mantenere solo le ultime 10 azioni
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
