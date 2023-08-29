import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamListAuth} from '../utils/types';
import Signup from '../views/auth/Signup';

const Stack = createNativeStackNavigator<RootStackParamListAuth>();

const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Signup'} component={Signup} />
    </Stack.Navigator>
  );
};

export default Auth;
