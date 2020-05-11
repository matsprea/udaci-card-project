import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as colors from '../utils/colors';

const TouchButton = ({
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

const styles = StyleSheet.create({
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
