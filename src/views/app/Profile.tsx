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
import React from 'react';
import {RootStackParamListApp} from '../../utils/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors} from '../../utils/colors';
import {heightToDp, widthToDp} from '../../utils/dimensions';
import Button from '../../components/Button';
import VideoCard, {VideoProps} from '../../components/VideoCard';

type Props = NativeStackScreenProps<RootStackParamListApp, 'Profile'> & {};
export default function Profile({navigation}: Props) {
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
              uri: 'https://thumbs.dreamstime.com/b/handsome-man-black-suit-white-shirt-posing-studio-attractive-guy-fashion-hairstyle-confident-man-short-beard-125019349.jpg',
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
            <Text style={styles.text}>{'Yusuf Truth'}</Text>
            <Image
              style={{width: 15, height: 15, marginLeft: heightToDp(1)}}
              source={require('../../../assets/images/thik.png')}
            />
          </View>
          <Text style={{color: Colors.GRAY}}>bio about what his bio is</Text>
        </View>
        <View style={{marginVertical: heightToDp(3)}}>
          <Button
            text={'Following'}
            withIcon={false}
            backgroundColor={Colors.WHITE}
            textColor={Colors.BLACK}
            onPress={() => {}}
            isLoading={false}
            disabled={false}
          />
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
