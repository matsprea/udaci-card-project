import React, { FunctionComponent, useState } from 'react';
import { Text, View, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import * as colors from '../utils/colors';
import { RootStackParamList } from './AppNavigator';
import { addCartToDeckCreator } from '../store/decks/actions';

import TouchButton from './TouchButton';

type AddCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddCard'
>;

type AddCardRouteProp = RouteProp<RootStackParamList, 'AddCard'>;

export interface IProps {
  route: AddCardRouteProp;
  navigation: AddCardNavigationProp;
}

interface Styles {
  Container: ViewStyle;
  Block: ViewStyle;
  TextInput: TextStyle;
  Title: TextStyle;
}

const AddCard: FunctionComponent<IProps> = ({ route, navigation }) => {

  const { title } = route.params;

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const card = {
      question,
      answer,
    };

    dispatch(addCartToDeckCreator(title, card));
    setQuestion('');
    setAnswer('');

    navigation.goBack();
  };

  return (
    <View style={styles.Container}>
      <View>
        <View style={styles.Block}>
          <Text style={styles.Title}>Add a question</Text>
        </View>
        <View style={[styles.Block]}>
          <TextInput
            style={styles.TextInput}
            value={question}
            onChangeText={setQuestion}
            placeholder="Question"
            autoFocus={true}
            returnKeyType="next"
            blurOnSubmit={false}
          />
        </View>
        <View style={[styles.Block]}>
          <TextInput
            style={styles.TextInput}
            value={answer}
            onChangeText={setAnswer}
            placeholder="Answer"
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
            blurOnSubmit={false}
          />
        </View>
        <TouchButton
          onPress={handleSubmit}
          disabled={question === '' || answer === ''}
        >
          Create Card
        </TouchButton>
      </View>
      <View style={{ height: '30%' }} />
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
    justifyContent: 'space-around',
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
    borderColor: 'gray',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 20,
    height: 40,
  }
});


export default AddCard;
