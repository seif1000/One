import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootStackParamListApp} from '../../utils/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors} from '../../utils/colors';
import {heightToDp, widthToDp} from '../../utils/dimensions';
import Button from '../../components/Button';
import VideoCard, {VideoProps} from '../../components/VideoCard';
import {API_KEY} from '../../utils/contants';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import millify from 'millify';

type Props = NativeStackScreenProps<RootStackParamListApp, 'Profile'> & {};
export default function Profile({navigation, route}: Props) {
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isfetshing, setIsfetshing] = useState<boolean>(false);
  const [loadUser, setLoadUser] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUser();
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
  const fetchUser = async () => {
    try {
      setLoadUser(true);
      const user = await firestore()
        .collection('Users')
        .doc(auth().currentUser?.uid)
        .get();

      if (user.exists) {
        setUser(user.data());
      }
      setLoadUser(false);
    } catch (error) {
      setLoadUser(false);
      console.log(error);
    }
  };

  const onFollow = () => {
    try {
      if (user.followings.includes(route.params.channel_id)) {
        firestore()
          .collection('Users')
          .doc(auth().currentUser?.uid)
          .update({
            followings: firestore.FieldValue.arrayRemove(
              route.params.channel_id,
            ),
          });
        const newFollowings = user.followings.filter(
          item => item !== route.params.channel_id,
        );
        setUser({...user, followings: newFollowings});
      } else {
        firestore()
          .collection('Users')
          .doc(auth().currentUser?.uid)
          .update({
            followings: firestore.FieldValue.arrayUnion(
              route.params.channel_id,
            ),
          });
        setUser({
          ...user,
          followings: [...user.followings, route.params.channel_id],
        });
      }
    } catch (error) {}
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

  if (loadUser && !user) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <ActivityIndicator animating color={Colors.WHITE} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={{width: widthToDp(6), height: widthToDp(6)}}
          source={require('../../../assets/images/back.png')}
        />
      </TouchableOpacity>
      <View style={styles.profileView}>
        <View style={styles.imageView}>
          <Image
            source={{
              uri: route.params.channel_image,
            }}
            style={styles.image}
          />
        </View>
        <View
          style={{
            marginTop: heightToDp(2),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.textView}>
            <Text style={styles.text}>{route.params.channel_name}</Text>
            <Image
              style={{width: 15, height: 15, marginLeft: heightToDp(1)}}
              source={require('../../../assets/images/thik.png')}
            />
          </View>
          <Text style={{color: Colors.GRAY}}>bio about what his bio is</Text>
        </View>
        <View style={{marginVertical: heightToDp(3)}}>
          <Button
            text={
              user?.followings.includes(route.params.channel_id)
                ? 'Following'
                : `Follow ${millify(Number(route.params.channel_subs))}`
            }
            withIcon={false}
            backgroundColor={
              user?.followings.includes(route.params.channel_id)
                ? Colors.BLACK
                : Colors.WHITE
            }
            textColor={
              user?.followings.includes(route.params.channel_id)
                ? Colors.WHITE
                : Colors.BLACK
            }
            onPress={() => {
              onFollow();
            }}
            isLoading={false}
            disabled={false}
          />
        </View>
      </View>
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
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  profileView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightToDp(5),
  },
  imageView: {
    width: heightToDp(10),
    height: heightToDp(10),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: heightToDp(5),
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
