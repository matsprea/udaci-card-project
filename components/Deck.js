import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import * as colors from '../utils/colors';

const Deck = ({ deck }) => {
  return deck === undefined ? (
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
};

export default Deck;

const styles = StyleSheet.create({
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
