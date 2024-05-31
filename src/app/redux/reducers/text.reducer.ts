import * as TextAction from "../actions/text.actions";
import { Text } from '../../models/Text';

export type Action = TextAction.All;

// Stato iniziale del post
const defaultState: Text = {
  text: 'Nuovo titolo!',
};

// Funzione di utilità per creare un nuovo oggetto stato
const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

// Funzione reducer per gestire le azioni relative al post
export function textReducer(state: Text = defaultState, action: Action) {
  console.log(action.type, state);

  switch (action.type) {
    case TextAction.SET_TEXT:
      // Gestisce l'azione SET_TEXT modificando il testo del campo input
      return newState(state, {text: action.payload});


    default:
      // Caso di default: restituisce lo stato corrente senza modifiche
      return state;
  }
}
