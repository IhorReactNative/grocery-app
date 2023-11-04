import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export const Title: React.FC<TextProps> = ({ children, ...props }) => (
  <Text style={styles.title} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
});
