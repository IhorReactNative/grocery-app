import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export const Paragraph: React.FC<TextProps> = ({ children, ...props }) => (
  <Text style={styles.text} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
