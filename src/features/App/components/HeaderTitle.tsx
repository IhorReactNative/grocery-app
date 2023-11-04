import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

export const HeaderTitle: React.FC<TextProps> = ({ children, ...props }) => (
  <Text style={styles.title} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
