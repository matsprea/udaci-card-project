import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import * as colors from '../utils/colors';

import { removeDeckCreator } from '../store/decks/actions';
import { useTypedSelector } from '../store';

import Deck from './Deck';
import TextButton from './TextButton';
import TouchButton from './TouchButton';

const DeckDetail = ({ route, navigation }) => {
  const { title } = route.params;

  const deck = useTypedSelector((state) =>
    state.decks.data.find((deck) => deck.title === title)
  );

  const dispatch = useDispatch();

  const handleDelete = (title) => {
    navigation.goBack();
    dispatch(removeDeckCreator(title));
  };

  return (
    <View style={styles.View}>
      <Deck deck={deck} />
      <View>
        <TouchButton onPress={() => navigation.navigate('AddCard', { title })}>
          Add Card
        </TouchButton>
        <TouchButton
          btnStyle={{ backgroundColor: colors.orange }}
          onPress={() => navigation.navigate('Quiz', { deck })}
        >
          Start Quiz
        </TouchButton>
      </View>
      <TextButton
        txtStyle={{ color: colors.red }}
        onPress={() => handleDelete(deck.title)}
      >
        Delete Deck
      </TextButton>
    </View>
  );
};

export default DeckDetail;

const styles = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: colors.gray,
  },
});
