import { Action } from "@ngrx/store";

// Definizione dei tipi di azione
export const SET_TEXT = '[Text] Setting';

// Azione per impostare il testo
export class SetText implements Action {
  readonly type = SET_TEXT;

  constructor(public payload: string) {}
}

// Tipo unione che rappresenta tutte le azioni possibili per il testo
export type All
  = SetText;
