import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {RootStackParamListApp} from '../../utils/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors} from '../../utils/colors';
import {heightToDp, widthToDp} from '../../utils/dimensions';
import Button from '../../components/Button';
import VideoCard, {VideoProps} from '../../components/VideoCard';
import YoutubePlayer from 'react-native-youtube-iframe';

type Props = NativeStackScreenProps<RootStackParamListApp, 'Video'> & {};

export default function Video({route, navigation}: Props): JSX.Element {
  const renderItems = ({index, item}: {index: number; item: VideoProps}) => {
    return (
      <VideoCard
        key={index}
        id={item.id}
        thumbnail={item.thumbnail}
        title={item.title}
        channel={item.channel}
        channelImage={item.channelImage}
        date={item.date}
        channel_id={item.channel_id}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.videoContainer}>
        <View style={styles.videoView}>
          <View style={styles.video}>
            <YoutubePlayer
              height={300}
              play={true}
              videoId={route.params.videoId}
              onChangeState={() => {}}
            />
          </View>
          <View style={styles.textView}>
            <Text style={styles.title}>
              Friends Can Make Or Break YOU (my personal journey & what I
              learned) 2 days ago
            </Text>
            <Text style={styles.date}>2 Days ago</Text>
          </View>
        </View>

        <View style={styles.channelView}>
          <View style={styles.channelViewLeft}>
            <Image
              source={{
                uri: 'https://thumbs.dreamstime.com/b/handsome-man-black-suit-white-shirt-posing-studio-attractive-guy-fashion-hairstyle-confident-man-short-beard-125019349.jpg',
              }}
              style={styles.channelImage}
            />
            <View style={{marginLeft: 8}}>
              <Text style={[styles.title, {marginBottom: 0}]}>
                Nathan Lucas
              </Text>
              <Text style={styles.date}>2.5M subscribers</Text>
            </View>
          </View>
          <View style={styles.channelViewRight}>
            <Button
              text={'Follow'}
              withIcon={false}
              backgroundColor={Colors.WHITE}
              textColor={Colors.BLACK}
              onPress={() => {}}
              isLoading={false}
              disabled={false}
              width={widthToDp(30)}
            />
          </View>
        </View>
        <View style={styles.iconView}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={styles.icon}
              source={require('../../../assets/images/like.png')}
            />
            <Text style={{color: Colors.WHITE, marginTop: 6}}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={styles.icon}
              source={require('../../../assets/images/watch.png')}
            />
            <Text style={{color: Colors.WHITE, marginTop: 6}}>Watch Later</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={styles.icon}
              source={require('../../../assets/images/save.png')}
            />
            <Text style={{color: Colors.WHITE, marginTop: 6}}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={[1, 2, 2]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItems}
        onEndReachedThreshold={0.8}
        onEndReached={() => {}}
        ListFooterComponent={() => {
          return (
            <View style={{paddingVertical: heightToDp(5)}}>
              <ActivityIndicator
                animating
                color={'white'}
                size={widthToDp(20)}
              />
            </View>
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
  },
  videoContainer: {
    width: '100%',
    // backgroundColor: 'red',
  },
  videoView: {},
  video: {
    height: heightToDp(28),
  },
  textView: {
    paddingHorizontal: widthToDp(2.5),
    paddingVertical: heightToDp(1),
    // backgroundColor: 'green',
  },
  title: {
    color: Colors.WHITE,
    marginBottom: 8,
  },
  date: {
    color: Colors.GRAY,
  },
  channelView: {
    paddingHorizontal: widthToDp(2.5),
    paddingVertical: heightToDp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  channelViewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelImage: {
    width: widthToDp(10),
    height: widthToDp(10),
    borderRadius: widthToDp(10) / 2,
  },
  channelViewRight: {},
  iconView: {
    paddingHorizontal: widthToDp(2.5),
    paddingVertical: heightToDp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: widthToDp(5.1),
    height: widthToDp(5),
  },
});
