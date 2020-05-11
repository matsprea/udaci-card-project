import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Provider } from 'react-redux';

import { setLocalNotification } from './utils/notification';
import * as colors from './utils/colors';
import { store } from './store';

import UdaciCardStatusBar from './components/UdaciCardStatusBar';
import AppNavigator from './components/AppNavigator';

interface Styles {
  View: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  View: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = () => {
  useEffect(() => setLocalNotification);

  return (
    <Provider store={store}>
      <View style={styles.View}>
        <UdaciCardStatusBar backgroundColor={colors.blue} />
        <AppNavigator />
      </View>
    </Provider>
  );
};

export default App;
