import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import { setLocalNotification } from './utils/notification';
import { store } from './store';

import AppNavigator from './components/AppNavigator';

const App = () => {
  useEffect(() => setLocalNotification, []);

  return (
    <Provider store={store}>
        <AppNavigator />
    </Provider>
  );
};

export default App;