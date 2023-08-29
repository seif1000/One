import React, {useEffect, useRef, useState} from 'react';
import {Text, Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamListApp, TabParamList} from '../utils/types';
import {Colors} from '../utils/colors';
import {widthToDp} from '../utils/dimensions';
import Home from '../views/app/Home';
import Serach from '../views/app/Serach';
import Library from '../views/app/Library';
import Video from '../views/app/Video';
import Profile from '../views/app/Profile';

const Stack = createNativeStackNavigator<RootStackParamListApp>();
const Tab = createBottomTabNavigator<TabParamList>();

const renderTabIcon = (route: any, focused: boolean) => {
  let iconName: number = require('../../assets/images/home.png');
  switch (route.name) {
    case 'Home':
      iconName = require('../../assets/images/home.png');
      break;
    case 'Search':
      iconName = require('../../assets/images/search.png');
      break;
    case 'Library':
      iconName = require('../../assets/images/lib.png');
      break;
  }
  return (
    <Image
      source={iconName}
      style={{
        width: widthToDp(6),
        height: widthToDp(6),
        resizeMode: 'contain',
        tintColor: focused ? 'yellow' : Colors.WHITE,
      }}
    />
  );
};

const TapScreen = ({}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.BLACK,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {fontSize: widthToDp(3)},
        tabBarIcon: ({focused}) => renderTabIcon(route, focused),
        tabBarLabel: ({focused}) => '',
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Serach} />
      <Tab.Screen name="Library" component={Library} />
    </Tab.Navigator>
  );
};
// export const socket = socketIOClient(URL);

const App = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Root'} component={TapScreen} />
      <Stack.Screen name="Video" component={Video} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default App;
