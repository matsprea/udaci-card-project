import React, { FunctionComponent } from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import * as colors from '../utils/colors';
import { IDeck } from '../store/decks/types';

interface IProps {
  deck: IDeck;
}

interface Styles {
  View: ViewStyle;
  DeckText: TextStyle;
  CardText: TextStyle;
}

const Deck: FunctionComponent<IProps> = ({ deck }) => {
  return  deck === undefined ? (
    <View style={styles.View} />
  ) : (
    <View style={styles.View}>
      <View>
        <Text style={styles.DeckText}>{deck.title}</Text>
      </View>
      <View>
        <Text style={styles.CardText}>{deck.cards?.length} cards</Text>
      </View>
    </View>
  );
  }

export default Deck;

const styles = StyleSheet.create<Styles>({
  View: {
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: 120,
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: colors.white,
    borderRadius: 5,
    marginBottom: 10,
  },
  DeckText: {
    fontSize: 28,
  },
  CardText: {
    fontSize: 18,
    color: colors.textGray,
  },
});
