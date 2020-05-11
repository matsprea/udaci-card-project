import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { IDeck } from '../store/decks/types';
import DeckList from './DeckList';

const Stack = createStackNavigator();

export type RootStackParamList = {
  DeckList: undefined;
  DeckDetail: { deck: IDeck };
  AddDeck: undefined;
  AddCard: { deck: IDeck };
  Quiz: { deck: IDeck };
};

const AppNavigator = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="DeckList" component={DeckList} />
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default AppNavigator;