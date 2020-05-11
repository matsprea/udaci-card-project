import { combineReducers, createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

import { decksReducer } from './decks/reducers';
import { IDecksState } from './decks/types';

export interface IAppState {
  decks: IDecksState;
}

const rootReducer = combineReducers<IAppState>({
  decks: decksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = createStore<IAppState, any, any, any>(
  rootReducer,
  applyMiddleware(thunk, logger)
);