import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamListAuth = {
  Signup: undefined;
};
export type RootStackParamListApp = {
  Root: NavigatorScreenParams<TabParamList>;
  Video: {
    videoId: string;
    videoTitle: string;
    videoDate: string;
    channel_id: string;
    channel_image: string;
    channel_name: string;
    channel_subs: string;
  };
  Profile: {
    channel_id: string;
    channel_image: string;
    channel_name: string;
    channel_subs: string;
    channel_bio: string;
  };
};
export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Library: undefined;
};
