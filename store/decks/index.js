import { combineReducers, createStore } from 'redux';
import { decksReducer } from './reducers';

const store = createStore(
    combineReducers({
        decks: decksReducer,
    })
);

export default store;