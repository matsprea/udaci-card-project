import { combineReducers, createStore } from 'redux';
import { decksReducer } from './reducers';
import { IDecksState } from './types';

export interface IRootState {
  decks: IDecksState;
}

const store = createStore<IRootState, any, any, any>(
  combineReducers({
    decks: decksReducer,
  })
);

export default store;
