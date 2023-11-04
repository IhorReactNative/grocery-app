import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ENTITY_STATUS } from '../types';

interface StatusProps {
  inStock: boolean;
}

export const StatusLabel: React.FC<StatusProps> = ({ inStock }) => (
  <Text style={[styles.label, inStock ? styles.labelInStock : styles.labelOutOfStock]}>
    {inStock ? ENTITY_STATUS.have : ENTITY_STATUS.runOut}
  </Text>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: '400',
  },
  labelInStock: {
    color: '#4caf50',
  },
  labelOutOfStock: {
    color: '#f44336',
  },
});
