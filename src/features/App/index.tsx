import React from 'react';
import 'react-native-gesture-handler';
import { AppNavigation } from './navigation/AppNavigation';
import { ReduxProvider } from './redux';

const App = () => {
  return (
    <ReduxProvider>
      <AppNavigation />
    </ReduxProvider>
  );
};

export default App;
