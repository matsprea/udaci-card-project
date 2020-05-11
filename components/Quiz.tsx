import React, { FunctionComponent, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import ViewPager from '@react-native-community/viewpager';

import {
  clearLocalNotification,
  setLocalNotification,
} from '../utils/notification';
import * as colors from '../utils/colors';
import { ICard } from '../store/decks/types';
import { RootStackParamList } from './AppNavigator';

import NoCardsQuiz from './NoCardsQuiz';
import QuizResult from './QuizResult';
import TouchButton from './TouchButton';
import TextButton from './TextButton';

type QuizNavigationProp = StackNavigationProp<RootStackParamList, 'Quiz'>;

type QuizRouteProp = RouteProp<RootStackParamList, 'Quiz'>;

interface IProps {
  route: QuizRouteProp;
  navigation: QuizNavigationProp;
}

export enum Answer {
  CORRECT = 'correct',
  INCORRECT = 'incorrect',
}

interface Styles {
  block: ViewStyle;
  container: ViewStyle;
  count: TextStyle;
  pageStyle: ViewStyle;
  questionContainer: ViewStyle;
  questionText: TextStyle;
  title: TextStyle;
}

const Quiz: FunctionComponent<IProps> = ({ route, navigation }) => {
  const { cards } = route.params.deck;
  const questionCount = cards.length;

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [answered, setAnswered] = useState(
    Array<boolean>(questionCount).fill(false)
  );

  const [showQuestion, setShowQuestion] = useState(true);

  useEffect(() => {
    clearLocalNotification()
      .then(setLocalNotification)
      .catch((err) => {
        console.log(`Error in clearing the Notification: ${err}`)
      });
  }, []);

  const handleAnswer = (response: Answer, reponseIdx: number) => {
    if (response === Answer.CORRECT) {
      setCorrectCount(correctCount + 1);
    } else {
      setIncorrectCount(incorrectCount + 1);
    }
    setAnswered(answered.map((val, idx) => (reponseIdx === idx ? true : val)));
  };

  const handleReset = () => {
    setCorrectCount(0);
    setIncorrectCount(0);
    setAnswered(Array<boolean>(questionCount).fill(false));
  };

  if (questionCount === 0) {
    return <NoCardsQuiz />;
  }

  if (correctCount + incorrectCount === questionCount) {
    return (
      <QuizResult
        correct={correctCount}
        questionCount={questionCount}
        handleReset={handleReset}
        navigation={navigation}
      />
    );
  }

  const renderPage = (card: ICard, idx: number) => {
    return (
      <View style={styles.pageStyle} key={idx} collapsable={false}>
        <View style={styles.block}>
          <Text style={styles.count}>
            {idx + 1} / {questionCount}
          </Text>
        </View>
        <View style={[styles.block, styles.questionContainer]}>
          <Text style={styles.questionText}>
            {showQuestion ? 'Question' : 'Answer'}
          </Text>
          <Text style={styles.title}>
            {showQuestion ? card.question : card.answer}
          </Text>
        </View>
        <TextButton
          txtStyle={{ color: colors.red }}
          onPress={() => setShowQuestion(!showQuestion)}
        >
          {showQuestion ? 'Show Answer' : 'Show Question'}
        </TextButton>
        <View>
          <TouchButton
            btnStyle={{
              backgroundColor: colors.blue,
              borderColor: colors.white,
            }}
            onPress={() => handleAnswer(Answer.CORRECT, idx)}
            disabled={answered[idx]}
          >
            Correct
          </TouchButton>
          <TouchButton
            btnStyle={{
              backgroundColor: colors.orange,
              borderColor: colors.darkGray,
            }}
            onPress={() => handleAnswer(Answer.INCORRECT, idx)}
            disabled={answered[idx]}
          >
            Incorrect
          </TouchButton>
        </View>
      </View>
    );
  };

  const handlePageScroll = () => {
    setShowQuestion(true);
  };

  return (
    <ViewPager
      onPageScroll={handlePageScroll}
      style={styles.container}
      scrollEnabled={true}
      initialPage={0}
      orientation={'horizontal'}
    >
      {cards.map((card, idx) => renderPage(card, idx))}
    </ViewPager>
  );
};

export default Quiz;

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
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
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: colors.darkGray,
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    flexGrow: 1,
  },
  questionText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 20,
  },
});
