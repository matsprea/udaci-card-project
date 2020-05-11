import React, { FunctionComponent } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native';

interface IProps {
  children: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  txtStyle?: TextStyle;
}

interface Styles {
  btnContainer: ViewStyle;
  btnText: TextStyle;
}

const TextButton: FunctionComponent<IProps> = ({
  children,
  onPress,
  txtStyle = {},
}) => (
  <View style={styles.btnContainer}>
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.btnText, txtStyle]}>{children}</Text>
    </TouchableOpacity>
  </View>
);

export default TextButton;

const styles = StyleSheet.create<Styles>({
  btnContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  btnText: {
    fontSize: 20,
  },
});
