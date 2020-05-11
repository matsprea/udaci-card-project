import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { FunctionComponent } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { useTypedSelector } from '../store/index';

import * as colors from '../utils/colors';

import { RootStackParamList } from './AppNavigator';
import Deck from './Deck';

type DeckListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DeckList'
>;

export interface IProps {
  navigation: DeckListNavigationProp;
}

interface Styles {
  ScrollView: ViewStyle;
  Text: TextStyle;
}

const DeckList: FunctionComponent<IProps> = ({ navigation }) => {

  const decks = useTypedSelector( state  => state.decks.data);

  return (
    <ScrollView style={styles.ScrollView}>
      <Text style={styles.Text}>Mobile Flashcards</Text>
      {decks.map((deck) => {
        return (
          <TouchableOpacity
            key={deck.title}
            onPress={() => navigation.push('DeckDetail', { deck })}
          >
            <Deck deck={deck} />
          </TouchableOpacity>
        );
      })}
      <View style={{ marginBottom: 30 }} />
    </ScrollView>
  );
};

export default DeckList;

const styles = StyleSheet.create<Styles>({
  ScrollView: {
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
    color: colors.green,
  },
});