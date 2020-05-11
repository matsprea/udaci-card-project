import {
  IAddDeck,
  IRemoveDeck,
  IAddCartToDeck,
  DecksActionTypes,
  IDeck,
  ICard,
  ILoadDecks,
  ILoadingDecks,
} from './types';

import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { saveDeck, deleteDeck, addCardToDeck, getAllDecks } from './storage';

export const loadingDecksAction = (loading: boolean = true): ILoadingDecks => ({
  type: DecksActionTypes.LOADING_DECKS,
  payload: { loading },
});

export const loadDecksAction = (data: IDeck[]): ILoadDecks => ({
  type: DecksActionTypes.LOAD_DECKS,
  payload: { data },
});

export const addDeckAction = (deck: IDeck): IAddDeck => ({
  type: DecksActionTypes.ADD_DECK,
  payload: deck,
});

export const removeDeckAction = (title: string): IRemoveDeck => ({
  type: DecksActionTypes.REMOVE_DECK,
  payload: {
    title,
  },
});

export const addCartToDeckAction = (
  title: string,
  card: ICard
): IAddCartToDeck => ({
  type: DecksActionTypes.ADD_CARD_TO_DECK,
  payload: {
    title,
    card,
  },
});

export const loadDecksCreator: ActionCreator<ThunkAction<
  Promise<ILoadDecks>,
  IDeck[],
  null,
  ILoadDecks
>> = () => async (dispatch: Dispatch) => {
  dispatch(loadingDecksAction());
  const data = await getAllDecks();
  return dispatch(loadDecksAction(data));
};

export const addDeckCreator: ActionCreator<ThunkAction<
  Promise<IAddDeck>,
  IDeck,
  IDeck,
  IAddDeck
>> = (deck: IDeck) => async (dispatch: Dispatch) => {
  await saveDeck(deck);
  return dispatch(addDeckAction(deck));
};

export const removeDeckCreator: ActionCreator<ThunkAction<
  Promise<IRemoveDeck>,
  string,
  string,
  IRemoveDeck
>> = (title: string) => async (dispatch: Dispatch) => {
  await deleteDeck(title);
  return dispatch(removeDeckAction(title));
};

export const addCartToDeckCreator: ActionCreator<ThunkAction<
  Promise<IAddCartToDeck>,
  { title: string; card: ICard },
  { title: string; card: ICard },
  IAddCartToDeck
>> = (title: string, card: ICard) => async (dispatch: Dispatch) => {
  await addCardToDeck(title, card);
  return dispatch(addCartToDeckAction(title, card));
};
