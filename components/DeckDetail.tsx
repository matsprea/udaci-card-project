import React, { FunctionComponent } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  
} from 'react-native';
import { white, textGray } from '../utils/colors';

import { RootStackParamList } from './AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

import * as colors from '../utils/colors';

import { useDispatch } from 'react-redux';
import Deck from './Deck';
import TextButton from './TextButton';

import { removeDeckCreator } from '../store/decks/actions';
import TouchButton from './TouchButton';
import { RouteProp } from '@react-navigation/native';
import { useTypedSelector } from '../store';
import { IDeck } from '../store/decks/types';

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

const DeckDetail: FunctionComponent<IProps> = ({
  route,
  navigation,
}) => {

  const { title } = route.params;

  const deck = useTypedSelector((state) => state.decks.data.find( deck => deck.title === title)) as IDeck;

  const dispatch = useDispatch();

  const handleDelete = (title: string) => {
    navigation.goBack();
    dispatch(removeDeckCreator(title));
  };

  navigation
  return (
    <View style={styles.View}>
      <Deck deck={deck} />
      <View>
        <TouchButton
          btnStyle={{ backgroundColor: white, borderColor: textGray }}
          txtStyle={{ color: textGray }}
          onPress={() => navigation.navigate('AddCard', { title })}
        >
          Add Card
        </TouchButton>
        <TouchButton
          btnStyle={{ backgroundColor: colors.green, borderColor: white }}
          txtStyle={{ color: white }}
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