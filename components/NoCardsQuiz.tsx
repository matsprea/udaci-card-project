import React from 'react'
import { View, Text, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import * as colors from '../utils/colors';

interface Styles {
  pageStyle: ViewStyle;
  block: ViewStyle;
  count: TextStyle;
}

const NoCardsQuiz = () => (
  <View style={styles.pageStyle}>
    <View style={styles.block}>
      <Text style={[styles.count]}>
        You cannot take a quiz because there are no cards in the deck.
      </Text>
      <Text style={[styles.count]}>Please add some cards and try again.</Text>
    </View>
  </View>
);

export default NoCardsQuiz;

const styles = StyleSheet.create<Styles>({
  pageStyle: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: colors.gray,
    justifyContent: 'space-around',
  },
  block: {
    marginBottom: 20,
  },
  count: {
    fontSize: 24,
    textAlign: 'center',
  },
});
