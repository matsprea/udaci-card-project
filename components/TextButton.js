import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const TextButton = ({ children, onPress, txtStyle = {} }) => (
  <View style={styles.btnContainer}>
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.btnText, txtStyle]}>{children}</Text>
    </TouchableOpacity>
  </View>
);

export default TextButton;

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  btnText: {
    fontSize: 20,
  },
});
