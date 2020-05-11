import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';

import TouchButton from './TouchButton';
import * as colors from '../utils/colors';
import { addDeckCreator } from '../store/decks/actions';

const AddDeck = ({ navigation }) => {
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  const handleChange = (text) => {
    setTitle(text);
  };

  const handleSubmit = () => {
    const deck = { title, cards: [] };
    dispatch(addDeckCreator(deck));
    setTitle('');
    navigation.replace('DeckDetail', { title });
  };

  return (
    <View style={styles.Container}>
      <View style={{ height: 60 }} />
      <View style={styles.Block}>
        <Text style={styles.Title}>What is the title of your new deck?</Text>
      </View>
      <View style={[styles.Block]}>
        <TextInput
          style={styles.TextInput}
          value={title}
          onChangeText={handleChange}
          placeholder="Deck Name"
          autoFocus={true}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      </View>
      <TouchButton onPress={handleSubmit} disabled={title === ''}>
        Create Deck
      </TouchButton>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: colors.gray,
  },
  Block: {
    marginBottom: 20,
  },
  Title: {
    textAlign: 'center',
    fontSize: 32,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: colors.textGray,
    backgroundColor: colors.white,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 20,
    height: 40,
    marginBottom: 20,
  },
});

export default AddDeck;
