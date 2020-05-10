import { Action } from 'redux';

export enum DecksActionTypes {
  ADD_DECK = 'ADD_DECK',
  REMOVE_DECK = 'REMOVE_DECK',
  ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK',
}

export interface IDecksState {
  readonly data: IDeck[];
}

export interface IDeck {
  title: string;
  cards: ICard[];
}

export interface ICard {
  question: string;
  answer: string;
}

export interface IAddDeck extends Action<DecksActionTypes.ADD_DECK> {
  payload: IDeck;
}

export interface IRemoveDeck extends Action<DecksActionTypes.REMOVE_DECK> {
  payload: {
    title: string;
  };
}

export interface IAddCartToDeck
  extends Action<DecksActionTypes.ADD_CARD_TO_DECK> {
  payload: {
    title: string;
    card: ICard;
  };
}

export type DecksActions =
  | IAddDeck
  | IRemoveDeck
  | IAddCartToDeck;
