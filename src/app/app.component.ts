import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from "rxjs";

import { Post } from './models/Post';
import { Text } from './models/Text';
import * as PostActions from './redux/actions/post.actions';
import * as TesxtActions from './redux/actions/text.actions';

// Interfaccia che descrive lo stato dell'applicazione
interface AppState {
  post: Post;
  text: Text;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Proprietà che contiene un Observable dello stato del post
  post: Observable<Post>;

  // Proprietà che contiene il testo inserito dall'utente
  text: Observable<Text>;

  writedText: string = '';

  constructor(private store: Store<AppState>) {
    // Seleziona la parte dello stato relativa al post e la assegna alla proprietà 'post'
    this.post = this.store.select('post');

    // In questo modo sfruttiamo l'observable di 'text' per aggiornare il valore di 'writedText'
    this.store.select('text').subscribe((data) => {
      this.writedText = data.text;
    });
  }

  // Metodo chiamato quando l'utente modifica il testo del post
  editText() {
    // Invia un'azione EDIT_TEXT con il testo inserito dall'utente
    // Invia un'azione SET_TEXT con il testo inserito dall'utente
    this.store.dispatch(new PostActions.EditText(this.writedText));
    this.store.dispatch(new TesxtActions.SetText(this.writedText));
  }

  // Metodo chiamato quando l'utente vuole resettare il post
  resetPost() {
    // Invia un'azione RESET per ripristinare lo stato iniziale del post
    this.store.dispatch(new PostActions.Reset());
  }

  // Metodo chiamato quando l'utente fa un upvote al post
  upvote() {
    // Invia un'azione UPVOTE per incrementare il conteggio dei likes
    this.store.dispatch(new PostActions.Upvote());
  }

  // Metodo chiamato quando l'utente fa un downvote al post
  downvote() {
    // Invia un'azione DOWNVOTE per decrementare il conteggio dei likes
    this.store.dispatch(new PostActions.Downvote());
  }
}
