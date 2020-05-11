import { FunctionComponent, Props} from 'react';
import { StatusBar } from 'react-native';
import Constants from 'expo-constants';

import {
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface IProps {
  backgroundColor: string;
}

interface Styles {
  View: ViewStyle;
}

const UdaciCardStatusBar: FunctionComponent<
  IProps & Props<StatusBar>
> = ({ backgroundColor, ...props }) => (
  <View style={styles(backgroundColor).View}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default UdaciCardStatusBar;

const styles = (backgroundColor: string) =>
  StyleSheet.create<Styles>({
    View: {
      height: Constants.statusBarHeight,
      backgroundColor,
    },
  });