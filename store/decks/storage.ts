import { AsyncStorage } from 'react-native';
import { IDeck, ICard } from './types';

const DECKS_STORAGE_KEY = '@deck:';
const getDeckStorageKey = (title: string) => DECKS_STORAGE_KEY + title;

export const getDeck = async (title: string): Promise<IDeck | void> =>
  AsyncStorage.getItem(getDeckStorageKey(title)).then((json) => {
    if (json !== null) return JSON.parse(json) as IDeck;
  });

export const deleteDeck = async (title: string): Promise<void> =>
  AsyncStorage.removeItem(getDeckStorageKey(title));

export const saveDeck = async (deck: IDeck): Promise<void> => {
  await AsyncStorage.setItem(
    getDeckStorageKey(deck.title),
    JSON.stringify(deck)
  );
};

export const addCardToDeck = async (title: string, card: ICard) => {
  const { cards } = (await getDeck(title)) as IDeck;
  const newCards = cards.concat(card);
  await saveDeck({ title, cards: newCards });
};

export const getAllDecks = async (): Promise<IDeck[]> =>
  AsyncStorage.getAllKeys()
    .then((keys: string[]) => {
      const fetchKeys = keys.filter((k) => {
        return k.startsWith(DECKS_STORAGE_KEY);
      });
      return AsyncStorage.multiGet(fetchKeys);
    })
    .then((result) => result.map((r) => JSON.parse(r[1]) as IDeck));
