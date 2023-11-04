import React from 'react';
import { Switch as RNSwitch, SwitchProps } from 'react-native';

export const Switch: React.FC<SwitchProps> = (props) => (
  <RNSwitch
    trackColor={{ false: '#dedede', true: '#29c953' }}
    thumbColor={'#f4f3f4'}
    ios_backgroundColor="#dedede"
    {...props}
  />
);
