import React, { FunctionComponent } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useDispatch } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import * as colors from '../utils/colors';

import { removeDeckCreator } from '../store/decks/actions';
import { useTypedSelector } from '../store';
import { IDeck } from '../store/decks/types';

import { RootStackParamList } from './AppNavigator';

import Deck from './Deck';
import TextButton from './TextButton';
import TouchButton from './TouchButton';

type DeckDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DeckDetail'
>;

type DeckDetailsRouteProp = RouteProp<RootStackParamList, 'DeckDetail'>;

interface IProps {
  route: DeckDetailsRouteProp;
  navigation: DeckDetailsNavigationProp;
}

interface Styles {
  View: ViewStyle;
}

const DeckDetail: FunctionComponent<IProps> = ({ route, navigation }) => {
  const { title } = route.params;

  const deck = useTypedSelector((state) =>
    state.decks.data.find((deck) => deck.title === title)
  ) as IDeck;

  const dispatch = useDispatch();

  const handleDelete = (title: string) => {
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

const styles = StyleSheet.create<Styles>({
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
