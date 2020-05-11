import { Action } from 'redux';

export enum DecksActionTypes {
  LOADING_DECKS = 'LOADING_DECKS',
  LOAD_DECKS = 'LOAD_DECKS',
  ADD_DECK = 'ADD_DECK',
  REMOVE_DECK = 'REMOVE_DECK',
  ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK',
}

export interface IDecksState {
  readonly data: IDeck[];
  readonly loading: boolean;
}

export interface IDeck {
  title: string;
  cards: ICard[];
}

export interface ICard {
  question: string;
  answer: string;
}

export interface ILoadingDecks extends Action<DecksActionTypes.LOADING_DECKS> {
  payload: {
    loading: boolean;
  };
}

export interface ILoadDecks extends Action<DecksActionTypes.LOAD_DECKS> {
  payload: {
    data: IDeck[];
  };
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
  | ILoadingDecks
  | ILoadDecks
  | IAddDeck
  | IRemoveDeck
  | IAddCartToDeck;
