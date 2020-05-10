import { combineReducers, createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { decksReducer } from './decks/reducers';
import { IDecksState } from './decks/types';

export interface IAppState {
  decks: IDecksState;
}

const rootReducer = combineReducers<IAppState>({
  decks: decksReducer,
});

export const store = createStore<IAppState, any, any, any>(
  rootReducer,
  applyMiddleware(thunk, logger)
);