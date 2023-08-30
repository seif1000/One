import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import React from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootStackParamListApp, TabParamList} from '../../utils/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors} from '../../utils/colors';
import HomeHeader from '../../components/HomeHeader';
import {widthToDp} from '../../utils/dimensions';
import VideoCard, {VideoProps} from '../../components/VideoCard';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamListApp>
>;

export default function Home({navigation, route}: Props): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader onPress={() => {}} />
      <FlatList
        data={[1, 2, 3]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({index, item}: {index: number; item: VideoProps}) => {
          return (
            <VideoCard
              thumbnail={
                'https://img.freepik.com/premium-psd/youtube-video-thumbnail-web-banner-template-business-video_475351-211.jpg'
              }
              title={
                'Friends Can Make Or Break YOU (my personal journey & what I learned)'
              }
              channel={'Yusuf Truth'}
              channelImage={
                'https://thumbs.dreamstime.com/b/handsome-man-black-suit-white-shirt-posing-studio-attractive-guy-fashion-hairstyle-confident-man-short-beard-125019349.jpg'
              }
              date={'1 day ago'}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    paddingHorizontal: widthToDp(2.5),
  },
});
