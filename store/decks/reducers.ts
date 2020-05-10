import { IDecksState, DecksActions, DecksActionTypes } from './types';
import { Reducer } from 'redux';

const init: IDecksState = {
  data: [],
};

export const decksReducer: Reducer<IDecksState, DecksActions> = (
  state: IDecksState = init,
  action: DecksActions
) => {
  switch (action.type) {
    case DecksActionTypes.ADD_DECK: {
      return {
        data: state.data.concat(action.payload),
      };
    }
    case DecksActionTypes.REMOVE_DECK: {
      return {
        data: state.data.filter((deck) => deck.title !== action.payload.title),
      };
    }
    case DecksActionTypes.ADD_CARD_TO_DECK: {
      return {
        data: state.data.map((deck) =>
          deck.title !== action.payload.title
            ? deck
            : {
                title: deck.title,
                cards: deck.cards.concat(action.payload.card),
              }
        ),
      };
    }
    default:
      return state;
  }
};
