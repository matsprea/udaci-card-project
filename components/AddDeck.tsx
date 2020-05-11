import React, { useState, FunctionComponent } from 'react';
import { Text, View, StyleSheet, TextInput, ViewStyle, TextStyle } from 'react-native';
import TouchButton from './TouchButton';
import * as colors from '../utils/colors';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './AppNavigator';
import { addDeckCreator } from '../store/decks/actions';
import { IDeck } from '../store/decks/types';

type AddDeckNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddDeck'
>;

export interface IProps {
  navigation: AddDeckNavigationProp;
}

interface Styles {
  Container: ViewStyle;
  Block: ViewStyle;
  TextInput: TextStyle;
  Title: TextStyle;
}

const AddDeck: FunctionComponent<IProps> = ({ navigation }) => {
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  const handleChange = (text: string) => {
    setTitle(text);
  };

  const handleSubmit = () => {
    const deck : IDeck = { title, cards: [] };
    dispatch(addDeckCreator(deck));
    setTitle('');

    navigation.reset({
      index: 1,
      routes: [
        { name: 'DeckList' },
        {
          name: 'DeckDetail',
          params: { deck },
        },
      ],
    });

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
      <TouchButton
        btnStyle={{ backgroundColor: colors.green, borderColor: colors.white }}
        onPress={handleSubmit}
        disabled={title === ''}
      >
        Create Deck
      </TouchButton>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
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
