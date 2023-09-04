import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootStackParamListApp, TabParamList} from '../../utils/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors} from '../../utils/colors';
import HomeHeader from '../../components/HomeHeader';
import {heightToDp, widthToDp} from '../../utils/dimensions';
import VideoCard, {VideoProps} from '../../components/VideoCard';
import axios from 'axios';
import {API_KEY, CREATORS} from '../../utils/contants';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamListApp>
>;

export default function Home({navigation, route}: Props): JSX.Element {
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [nextPages, setNextPages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isfetshing, setIsfetshing] = useState<boolean>(false);
  //const [channels, setChannels] = useState([]);

  const fetchVideos = async (isFetch: boolean) => {
    try {
      let channels: Array<{id: string; image: string; subs: string}> = [];
      if (isFetch) {
        setIsfetshing(true);
      } else {
        setIsLoading(true);
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

        channels = channelDetails;
      }

      const channelResponse = CREATORS.map(async creator => {
        const next_page_token = nextPages.find(
          item => item.id === creator.id,
        )?.token;

        if (nextPages.length > 0) {
          if (next_page_token) {
            return await axios.get(
              `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${creator.id}&pageToken=${next_page_token}&maxResults=50&key=${API_KEY}`,
            );
          } else {
            return;
          }
        } else {
          return await axios.get(
            `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${creator.id}&maxResults=50&key=${API_KEY}`,
          );
        }
      });

      const res = await Promise.all(channelResponse);

      let vids = res
        .filter(item => item !== undefined)
        .map(item => item.data.items)
        .flat();
      vids = vids.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        channel_id: item.snippet.channelId,
        channelImage: item.snippet.thumbnails.default.url,
        thumbnail: item.snippet.thumbnails.medium.url,
        date: item.snippet.publishedAt,
        sortDate: new Date(item.snippet.publishedAt).getTime(),
      }));

      vids = vids.sort((a, b) => b.sortDate - a.sortDate);

      vids = vids.map(item => {
        const channel = channels.find(
          channel => channel.id === item.channel_id,
        );
        return {
          ...item,
          channelImage: channel?.image,
          subs: channel?.subs,
        };
      });
      const tokens = res
        .filter(item => item !== undefined)
        .map(item => ({
          token: item.data.nextPageToken,
          id: item.data.items[0].snippet.channelId,
        }))
        .flat();

      // concat videos
      if (isFetch) {
        vids = [...videos, ...vids];
      }
      setVideos(vids);
      setNextPages(tokens);
      if (isFetch) {
        setIsfetshing(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      if (isFetch) {
        setIsfetshing(false);
      } else {
        setIsLoading(false);
      }
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  };

  useEffect(() => {
    fetchVideos(false);
  }, []);

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
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader onPress={() => {}} />
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
    paddingHorizontal: widthToDp(2.5),
  },
});
