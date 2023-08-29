import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {View} from 'react-native';
import Route from './src/navigations/Route';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  );
}

export default App;
