import * as DecksActionTypes from './types';

const init = {
    data: [],
    loading: false,
};

export const decksReducer = (
    state = init,
    action
) => {
    switch (action.type) {
        case DecksActionTypes.LOADING_DECKS:
            {
                return {
                    ...state,
                    loading: action.payload.loading,
                };
            }
        case DecksActionTypes.LOAD_DECKS:
            {
                return {
                    ...state,
                    data: action.payload.data,
                    loading: false,
                };
            }
        case DecksActionTypes.ADD_DECK:
            {
                return {
                    ...state,
                    data: state.data.concat(action.payload),
                };
            }
        case DecksActionTypes.REMOVE_DECK:
            {
                return {
                    ...state,
                    data: state.data.filter((deck) => deck.title !== action.payload.title),
                };
            }
        case DecksActionTypes.ADD_CARD_TO_DECK:
            {
                return {
                    ...state,
                    data: state.data.map((deck) =>
                        deck.title !== action.payload.title ?
                        deck : {
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