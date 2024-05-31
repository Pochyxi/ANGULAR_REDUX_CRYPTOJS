import { Action } from "@ngrx/store";

// Definizione dei tipi di azione
export const EDIT_TEXT = '[Post] Edit';
export const UPVOTE = '[Post] Upvote';
export const DOWNVOTE = '[Post] Downvote';
export const RESET = '[Post] Reset';

// Azione per modificare il testo del post
export class EditText implements Action {
  readonly type = EDIT_TEXT;

  constructor(public payload: string) {}
}

// Azione per incrementare il conteggio dei voti positivi (upvote)
export class Upvote implements Action {
  readonly type = UPVOTE;
}

// Azione per incrementare il conteggio dei voti negativi (downvote)
export class Downvote implements Action {
  readonly type = DOWNVOTE;
}

// Azione per resettare il post allo stato iniziale
export class Reset implements Action {
  readonly type = RESET;
}

// Tipo unione che rappresenta tutte le azioni possibili per il post
export type All
  = EditText
  | Upvote
  | Downvote
  | Reset;


