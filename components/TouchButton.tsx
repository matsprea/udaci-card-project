import React, { FunctionComponent } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import * as colors from '../utils/colors';

interface IProps {
  children: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  btnStyle?: ViewStyle;
  txtStyle?: TextStyle;
  disabled?: boolean;
}

interface Styles {
  btnContainer: ViewStyle;
  btn: ViewStyle;
  btnDisabled: ViewStyle;
  btnText: TextStyle;
  btnTextDisabled: TextStyle;
}

const TouchButton: FunctionComponent<IProps> = ({
  children,
  onPress,
  btnStyle = {},
  txtStyle = {},
  disabled = false,
}) => {
  const disabledButton = disabled ? styles.btnDisabled : {};
  const disabledButtonText = disabled ? styles.btnTextDisabled : {};

  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        style={[styles.btn, btnStyle, disabledButton]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.btnText, txtStyle, disabledButtonText]}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TouchButton;

const styles = StyleSheet.create<Styles>({
  btnContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  btn: {
    width: 200,
    height: 50,
    backgroundColor: colors.blue,
    borderRadius: 5,
    justifyContent: `center`,
    alignItems: `center`,
    borderWidth: 1,
    borderColor: '#999',
  },
  btnDisabled: {
    backgroundColor: colors.gray,
    borderColor: colors.darkGray,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  btnTextDisabled: {
    color: colors.darkGray,
  },
});
