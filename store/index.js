import { combineReducers, createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { useSelector } from 'react-redux';

import { decksReducer } from './decks/reducers';

const rootReducer = combineReducers({
    decks: decksReducer,
});


export const useTypedSelector = useSelector;

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);