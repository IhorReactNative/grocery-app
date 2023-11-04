import React from 'react';
import { View } from 'react-native';

interface Props {
  height?: number;
  color?: string;
  marginBottom?: number;
  marginTop?: number;
}

export const Divider: React.FC<Props> = ({ height = 2, color = '#dedede', marginTop = 10, marginBottom = 10 }) => (
  <View style={{ height, backgroundColor: color, marginTop, marginBottom }} />
);
