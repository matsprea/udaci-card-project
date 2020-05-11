import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { FunctionComponent } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { useTypedSelector } from '../store/index';
import * as colors from '../utils/colors';
import { RootStackParamList } from './AppNavigator';

import Deck from './Deck';
import TouchButton from './TouchButton';

type DeckListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DeckList'
>;

export interface IProps {
  navigation: DeckListNavigationProp;
}

interface Styles {
  View: ViewStyle;
  Text: TextStyle;
  NoDecks: TextStyle;
}

const DeckList: FunctionComponent<IProps> = ({ navigation }) => {
  
  const { data, loading } = useTypedSelector((state) => state.decks);
  const decks = data;

  return loading ? (
    <View style={[styles.View]}>
 
      <ActivityIndicator size="large" color={colors.blue} />
    </View>
  ) : (
    <ScrollView style={styles.View}>
      <Text style={styles.Text}>Mobile Flashcards</Text>
      {decks.length > 0 ? (
        decks.map((deck) => {
          return (
            <TouchableOpacity
              key={deck.title}
              onPress={() =>
                navigation.push('DeckDetail', { title: deck.title })
              }
            >
              <Deck deck={deck} />
            </TouchableOpacity>
          );
        })
      ) : (
        <Text style={styles.NoDecks}>No Decks available.</Text>
      )}
      <TouchButton onPress={() => navigation.push('AddDeck')}>
        Create Deck
      </TouchButton>
    </ScrollView>
  );
};

export default DeckList;

const styles = StyleSheet.create<Styles>({
  View: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: colors.gray,
  },
  Text: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 16,
    color: colors.blue,
  },
  NoDecks: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
});
