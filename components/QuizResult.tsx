import { View, Text, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import * as colors from '../utils/colors';
import TouchButton from './TouchButton';
import React, { FunctionComponent } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './AppNavigator';

interface Styles {
  pageStyle: ViewStyle;
  block: ViewStyle;
  count: TextStyle;
  resultTextGood: TextStyle;
  resultTextBad: TextStyle;
}

type QuizNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Quiz'
>;

interface IProps {
  correct: number;
  questionCount: number;
  handleReset: () => void;
  navigation: QuizNavigationProp
}

const QuizResult: FunctionComponent<IProps> = ({
  correct,
  questionCount,
  handleReset,
  navigation,
}) => {
  const percent = (correct / questionCount) * 100;
  const resultStyle =
    percent >= 70 ? styles.resultTextGood : styles.resultTextBad;

  return (
    <View style={styles.pageStyle}>
      <View style={styles.block}>
        <Text style={[styles.count, { textAlign: 'center' }]}>
          Quiz Complete!
        </Text>
        <Text style={resultStyle}>
          {correct} / {questionCount} correct
        </Text>
      </View>
      <View style={styles.block}>
        <Text style={[styles.count, { textAlign: 'center' }]}>
          Percentage correct
        </Text>
        <Text style={resultStyle}>{percent.toFixed(0)}%</Text>
      </View>
      <View>
        <TouchButton
          btnStyle={{
            backgroundColor: colors.orange,
            borderColor: colors.darkGray,
          }}
          onPress={handleReset}
        >
          Restart Quiz
        </TouchButton>
        <TouchButton

          onPress={() => {
            handleReset();
            navigation.goBack();
          }}
        >
          Back To Deck
        </TouchButton>
      </View>
    </View>
  );
};

export default QuizResult;

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
  resultTextGood: {
    color: colors.blue,
    fontSize: 46,
    textAlign: 'center',
  },
  resultTextBad: {
    color: colors.red,
    fontSize: 46,
    textAlign: 'center',
  },
});
