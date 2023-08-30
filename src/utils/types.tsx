import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamListAuth = {
  Signup: undefined;
};
export type RootStackParamListApp = {
  Root: NavigatorScreenParams<TabParamList>;
  Video: {
    videoId: string;
    channel_id: string;
  };
  Profile: {
    channel_id: string;
  };
};
export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Library: undefined;
};
