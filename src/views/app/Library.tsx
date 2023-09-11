import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamListApp, TabParamList} from '../../utils/types';
import {Colors} from '../../utils/colors';
import {heightToDp, widthToDp} from '../../utils/dimensions';
import Button from '../../components/Button';
import VideoCard, {VideoProps} from '../../components/VideoCard';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import axios from 'axios';
import {API_KEY, CREATORS} from '../../utils/contants';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Library'>,
  NativeStackScreenProps<RootStackParamListApp>
>;

export default function Library({navigation}: Props) {
  const [laterVideos, setLaterVideos] = React.useState<VideoProps[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  useEffect(() => {
    navigation.addListener('focus', () => {
      fetchVideos();
    });
  }, []);

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      const user = await firestore()
        .collection('Users')
        .doc(auth().currentUser?.uid)
        .get();
      const videos = user.data()?.videos;
      setLaterVideos(videos);

      if (videos.length > 0) {
        const channel_ids = CREATORS.map(item => item.id).join(',');
        const channelDetailsRes = await axios.get(
          `
        https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channel_ids}&key=${API_KEY}
        `.trim(),
        );

        const channelDetails = channelDetailsRes.data.items.map(item => {
          return {
            id: item.id,
            image: item.snippet.thumbnails.default.url,
            subs: item.statistics.subscriberCount,
          };
        });

        const vidIds = videos.map((item: any) => item).join(',');
        const vidRes = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${vidIds}&key=${API_KEY}`,
        );
        let vidDetails = vidRes.data.items.map((item: any) => {
          return {
            id: item.id,
            thumbnail: item.snippet.thumbnails.medium.url,
            title: item.snippet.title,
            channel: item.snippet.channelTitle,
            channelImage: item.snippet.thumbnails.default.url,
            date: item.snippet.publishedAt,
            channel_id: item.snippet.channelId,
            subs: '',
            sortDate: new Date(item.snippet.publishedAt).getTime(),
          };
        });

        vidDetails = vidDetails.map((item: any) => {
          const channel = channelDetails.find(
            channel => channel.id === item.channel_id,
          );
          return {
            ...item,
            subs: channel?.subs,
            channelImage: channel?.image,
          };
        });
        vidDetails.sort((a, b) => b.sortDate - a.sortDate);
        setLaterVideos(vidDetails);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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
  const renderHeader = () => {
    return (
      <>
        <Text
          style={{
            color: Colors.WHITE,
            marginVertical: heightToDp(2),
            marginLeft: widthToDp(2.5),
          }}>
          Library
        </Text>
        <View>
          <View style={{marginBottom: heightToDp(2)}}>
            <Button
              text={'apply for creator account'}
              withIcon={false}
              backgroundColor={Colors.WHITE}
              textColor={Colors.BLACK}
              onPress={() => {}}
              isLoading={false}
              disabled={false}
            />
          </View>
          <View style={{marginBottom: heightToDp(2)}}>
            <Button
              text={'share app'}
              withIcon={false}
              backgroundColor={Colors.WHITE}
              textColor={Colors.BLACK}
              onPress={() => {}}
              isLoading={false}
              disabled={false}
            />
          </View>
          <View style={{marginBottom: heightToDp(2)}}>
            <Button
              text={'request feature/report a bug'}
              withIcon={false}
              backgroundColor={Colors.WHITE}
              textColor={Colors.BLACK}
              onPress={() => {}}
              isLoading={false}
              disabled={false}
            />
          </View>
          <View style={{marginBottom: heightToDp(2)}}>
            <Button
              text={'request a channel removal'}
              withIcon={false}
              backgroundColor={Colors.BLACK}
              textColor={'red'}
              onPress={() => {}}
              isLoading={false}
              disabled={false}
            />
          </View>
        </View>

        <Text
          style={{
            color: Colors.WHITE,
            marginVertical: heightToDp(2),
            marginLeft: widthToDp(2.5),
          }}>
          watch later
        </Text>
      </>
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
          data={laterVideos}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItems}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: Colors.WHITE}}>No videos found</Text>
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
    // paddingHorizontal: widthToDp(2.5),
  },
});
