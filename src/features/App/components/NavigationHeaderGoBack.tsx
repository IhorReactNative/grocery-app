import React from 'react';
import { HeaderNavigationButton } from './HeaderNavigationButton';
import { useNavigation } from '@react-navigation/native';
import { arrowBack } from '../images';

export const NavigationHeaderGoBack = () => {
  const navigation = useNavigation();
  return <HeaderNavigationButton button={{ onPress: navigation.goBack }} icon={{ source: arrowBack }} />;
};
