import * as PostActions from '../actions/post.actions';
import { Post } from '../../models/Post';

export type Action = PostActions.All;

// Stato iniziale del post
const defaultState: Post = {
  text: 'Questo è il messaggio di default!',
  likes: 0
};

// Funzione di utilità per creare un nuovo oggetto stato
const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

// Funzione reducer per gestire le azioni relative al post
export function postReducer(state: Post = defaultState, action: Action) {
  console.log(action.type, state);

  switch (action.type) {
    case PostActions.EDIT_TEXT:
      // Gestisce l'azione EDIT_TEXT modificando il testo del post
      return newState(state, {text: action.payload});

    case PostActions.UPVOTE:
      // Gestisce l'azione UPVOTE incrementando il conteggio dei likes
      return newState(state, {likes: state.likes + 1});

    case PostActions.DOWNVOTE:
      // Gestisce l'azione DOWNVOTE decrementando il conteggio dei likes
      return newState(state, {likes: state.likes - 1});

    case PostActions.RESET:
      // Gestisce l'azione RESET ripristinando lo stato iniziale del post
      return defaultState;

    default:
      // Caso di default: restituisce lo stato corrente senza modifiche
      return state;
  }
}

