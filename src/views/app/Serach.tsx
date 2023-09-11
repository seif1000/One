import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../../utils/colors';
import Input from '../../components/Input';
import {heightToDp, widthToDp} from '../../utils/dimensions';
import Creator, {CreatorProps} from '../../components/Creator';

import axios from 'axios';
import {API_KEY, CREATORS} from '../../utils/contants';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootStackParamListApp, TabParamList} from '../../utils/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Search'>,
  NativeStackScreenProps<RootStackParamListApp>
>;
export default function Serach({navigation, route}: Props) {
  const [search, setSearch] = React.useState('');
  const [channels, setChannels] = React.useState<CreatorProps[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const fetchCahnnels = async () => {
    try {
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
          name: item.snippet.title,
        };
      });
      setChannels(channelDetails);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCahnnels();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* <Input
        handleChange={val => setSearch(val)}
        handleBlur={() => {}}
        value={search}
        placeholder={'Search'}
      /> */}
      <Text style={styles.title}>Creators</Text>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating color={Colors.WHITE} />
        </View>
      ) : (
        <FlatList
          data={channels}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({index, item}: {index: number; item: CreatorProps}) => {
            return (
              <Creator
                onPress={() => {
                  navigation.navigate('Profile', {
                    channel_id: item.id,
                    channel_image: item.image,
                    channel_subs: item.subs,
                    channel_bio: '',
                    channel_name: item.name,
                  });
                }}
                name={item.name}
                image={item.image}
                subs={item.subs}
                id={item.id}
                key={item.id}
              />
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
  title: {
    fontSize: 20,
    color: Colors.WHITE,
    marginVertical: heightToDp(1),
  },
});
