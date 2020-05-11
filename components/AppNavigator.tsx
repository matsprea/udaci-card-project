import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { IDeck } from '../store/decks/types';
import * as colors from '../utils/colors';

import DeckList from './DeckList';
import AddDeck from './AddDeck';
import AddCard from './AddCard';
import DeckDetail from './DeckDetail';
import { useDispatch } from 'react-redux';
import { loadDecksCreator } from '../store/decks/actions';

const Stack = createStackNavigator();

export type RootStackParamList = {
  DeckList: undefined;
  DeckDetail: { title: string };
  AddDeck: undefined;
  AddCard: { title: string };
  Quiz: { deck: IDeck };
};

const AppNavigator = () => {
      const dispatch = useDispatch();

      useEffect(() => {
        dispatch(loadDecksCreator());
      }, []);
    
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="DeckList"
          screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: colors.blue },
          }}
        >
          <Stack.Screen
            name="DeckList"
            component={DeckList}
            options={{ title: 'Deck List' }}
          />
          <Stack.Screen
            name="AddDeck"
            component={AddDeck}
            options={{ title: 'Add Deck' }}
          />
          <Stack.Screen
            name="DeckDetail"
            component={DeckDetail}
            options={{ title: 'View Deck' }}
          />
          <Stack.Screen
            name="AddCard"
            component={AddCard}
            options={{ title: 'Add Card' }}
          />
          {/* <Stack.Screen name="Quiz" component={Quiz} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default AppNavigator;