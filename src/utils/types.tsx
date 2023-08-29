import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamListAuth = {
  Signup: undefined;
};
export type RootStackParamListApp = {
  Root: NavigatorScreenParams<TabParamList>;
  Video: undefined;
  Profile: undefined;
};
export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Library: undefined;
};
