import * as DecksActionTypes from './types';
import { saveDeck, deleteDeck, addCardToDeck, getAllDecks } from './storage';

export const loadingDecksAction = (loading = true) => ({
    type: DecksActionTypes.LOADING_DECKS,
    payload: { loading },
});

export const loadDecksAction = (data) => ({
    type: DecksActionTypes.LOAD_DECKS,
    payload: { data },
});

export const addDeckAction = (deck) => ({
    type: DecksActionTypes.ADD_DECK,
    payload: deck,
});

export const removeDeckAction = (title) => ({
    type: DecksActionTypes.REMOVE_DECK,
    payload: {
        title,
    },
});

export const addCartToDeckAction = (title, card) => ({
    type: DecksActionTypes.ADD_CARD_TO_DECK,
    payload: {
        title,
        card,
    },
});

export const loadDecksCreator = () => async(dispatch) => {
    dispatch(loadingDecksAction());
    const data = await getAllDecks();
    return dispatch(loadDecksAction(data));
};

export const addDeckCreator = (deck) => async(dispatch) => {
    await saveDeck(deck);
    return dispatch(addDeckAction(deck));
};

export const removeDeckCreator = (title) => async(dispatch) => {
    await deleteDeck(title);
    return dispatch(removeDeckAction(title));
};

export const addCartToDeckCreator = (title, card) => async(dispatch) => {
    await addCardToDeck(title, card);
    return dispatch(addCartToDeckAction(title, card));
};