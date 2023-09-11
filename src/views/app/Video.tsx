import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootStackParamListApp} from '../../utils/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors} from '../../utils/colors';
import {heightToDp, widthToDp} from '../../utils/dimensions';
import Button from '../../components/Button';
import VideoCard, {VideoProps} from '../../components/VideoCard';
import YoutubePlayer from 'react-native-youtube-iframe';
import moment from 'moment';
import axios from 'axios';
import {API_KEY} from '../../utils/contants';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import millify from 'millify';

type Props = NativeStackScreenProps<RootStackParamListApp, 'Video'> & {};

export default function Video({route, navigation}: Props): JSX.Element {
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isfetshing, setIsfetshing] = useState<boolean>(false);

  useEffect(() => {
    fetchVideos(false);
  }, []);

  const fetchVideos = async (isFetch: boolean) => {
    try {
      if (isFetch) {
        setIsfetshing(true);
      } else {
        setIsLoading(true);
      }

      let res;

      if (nextPageToken != '') {
        res = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${route.params.channel_id}&pageToken=${nextPageToken}&maxResults=50&key=${API_KEY}`,
        );
      } else {
        if (videos.length > 0) {
          return;
        }
        res = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${route.params.channel_id}&maxResults=50&key=${API_KEY}`,
        );
      }

      let vids = res?.data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        channel_id: item.snippet.channelId,
        channelImage: route.params.channel_image,
        subs: route.params.channel_subs,
        thumbnail: item.snippet.thumbnails.medium.url,
        date: item.snippet.publishedAt,
      }));

      // concat videos
      if (isFetch) {
        vids = [...videos, ...vids];
      }
      setVideos(vids);
      setNextPageToken(res.data.nextPageToken);
      if (isFetch) {
        setIsfetshing(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      if (isFetch) {
        setIsfetshing(false);
      } else {
        setIsLoading(false);
      }
    }
  };
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
        subs={item.subs}
      />
    );
  };

  const OnAddVideo = async () => {
    try {
      const user = await firestore()
        .collection('Users')
        .doc(auth().currentUser?.uid)
        .get();

      if (user.exists) {
        firestore()
          .collection('Users')
          .doc(auth().currentUser?.uid)
          .update({
            videos: firestore.FieldValue.arrayUnion(route.params.videoId),
          });
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const renderHeader = () => {
    return (
      <View style={styles.videoContainer}>
        <TouchableOpacity
          style={styles.backView}
          onPress={() => navigation.goBack()}>
          <Image
            style={{width: widthToDp(6), height: widthToDp(6)}}
            source={require('../../../assets/images/back.png')}
          />
        </TouchableOpacity>
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
            <Text style={styles.title}>{route.params.videoTitle}</Text>
            <Text style={styles.date}>
              {moment(route.params.videoDate).fromNow()}
            </Text>
          </View>
        </View>

        <View style={styles.channelView}>
          <View style={styles.channelViewLeft}>
            <Image
              source={{
                uri: route.params.channel_image,
              }}
              style={styles.channelImage}
            />
            <View style={{marginLeft: 8}}>
              <Text style={[styles.title, {marginBottom: 0}]}>
                {route.params.channel_name}
              </Text>
              <Text style={styles.date}>
                {millify(Number(route.params.channel_subs))} subscribers
              </Text>
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
            onPress={OnAddVideo}
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
    );
  };
  const renderFooter = () => {
    return (
      <View style={{paddingVertical: heightToDp(5)}}>
        <ActivityIndicator animating color={'white'} size={widthToDp(20)} />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating color={Colors.WHITE} />
        </View>
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItems}
          onEndReachedThreshold={0.8}
          onEndReached={() => {
            if (isfetshing) {
              return;
            }

            fetchVideos(true);
          }}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    // flexGrow: 1,
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
  backView: {
    position: 'absolute',
    top: heightToDp(2),
    left: widthToDp(2.5),
    zIndex: 100,
    backgroundColor: 'black',
    padding: 5,
    borderRadius: widthToDp(5),
    //   backgroundColor: 'red',
  },
  backImage: {
    width: '100%',
    height: '100%',
    borderRadius: heightToDp(5),
  },
});
