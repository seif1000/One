import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {heightToDp, widthToDp} from '../utils/dimensions';
import {Colors} from '../utils/colors';

export type VideoProps = {
  thumbnail: string;
  title: string;
  channel: string;
  channelImage: string;
  date: string;
};

export default function VideoCard({
  thumbnail,
  channelImage,
  title,
  channel,
  date,
}: VideoProps): JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.thumbView}>
        <Image
          source={{uri: thumbnail}}
          style={[styles.imagesStyle, {borderRadius: widthToDp(2)}]}
        />
      </TouchableOpacity>
      <View style={styles.infoView}>
        <TouchableOpacity style={[styles.channelImageView, {flex: 1}]}>
          <Image
            source={{uri: channelImage}}
            style={[styles.imagesStyle, {borderRadius: widthToDp(7)}]}
          />
        </TouchableOpacity>

        <View style={[styles.rightInfoView, {flex: 6}]}>
          <Text style={styles.title}>{title}</Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Text style={styles.channel}>{date}</Text>
            <Text style={styles.channel}>{channel}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthToDp(100),
    borderRadius: widthToDp(2),
    height: heightToDp(40),
    marginBottom: heightToDp(1),
  },
  thumbView: {
    width: widthToDp(100),
    height: heightToDp(30),

    borderRadius: widthToDp(2),
  },
  imagesStyle: {
    width: '100%',
    height: '100%',
  },
  infoView: {
    width: widthToDp(100),
    height: heightToDp(10),
    borderRadius: widthToDp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelImageView: {
    width: widthToDp(14),
    height: widthToDp(14),
  },
  title: {
    color: 'white',
  },
  channel: {
    color: Colors.GRAY,
    marginRight: widthToDp(2),
  },
  rightInfoView: {paddingHorizontal: widthToDp(2)},
});
