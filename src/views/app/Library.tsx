import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamListApp} from '../../utils/types';
import {Colors} from '../../utils/colors';
import {heightToDp, widthToDp} from '../../utils/dimensions';
import Button from '../../components/Button';
import VideoCard, {VideoProps} from '../../components/VideoCard';

type Props = NativeStackScreenProps<RootStackParamListApp, 'Library'> & {};

export default function Library({navigation}: Props) {
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
      <FlatList
        data={[1, 2, 2]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItems}
        onEndReachedThreshold={0.8}
        onEndReached={() => {
          //  fetchVideos(true);
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
});
