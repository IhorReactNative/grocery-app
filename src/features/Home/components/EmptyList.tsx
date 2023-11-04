import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Paragraph } from '../../../components';

export const EmptyList = () => (
  <View style={styles.container}>
    <Title>No results.</Title>
    <Paragraph>Add new </Paragraph>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 50,
  },
});
