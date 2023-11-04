import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeRoutes } from '../../Home/navigation';
import { HeaderTitle } from '../components';

const Stack = createStackNavigator();

const ROUTES = [...HomeRoutes];

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitle: (props) => <HeaderTitle>{props.children}</HeaderTitle> }}>
        {ROUTES.map((route) => (
          <Stack.Screen key={route.name} {...route} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
