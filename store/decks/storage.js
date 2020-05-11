import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = '@deck:';
const getDeckStorageKey = (title) => DECKS_STORAGE_KEY + title;

export const getDeck = async(title) =>
    AsyncStorage.getItem(getDeckStorageKey(title)).then((json) => {
        if (json !== null) return JSON.parse(json);
    });

export const deleteDeck = async(title) =>
    AsyncStorage.removeItem(getDeckStorageKey(title));

export const saveDeck = async(deck) => {
    await AsyncStorage.setItem(
        getDeckStorageKey(deck.title),
        JSON.stringify(deck)
    );
};

export const addCardToDeck = async(title, card) => {
    const { cards } = (await getDeck(title));
    const newCards = cards.concat(card);
    await saveDeck({ title, cards: newCards });
};

export const getAllDecks = async() =>
    AsyncStorage.getAllKeys()
    .then((keys) => {
        const fetchKeys = keys.filter((k) => {
            return k.startsWith(DECKS_STORAGE_KEY);
        });
        return AsyncStorage.multiGet(fetchKeys);
    })
    .then((result) => result.map((r) => JSON.parse(r[1])));