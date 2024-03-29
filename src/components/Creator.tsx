import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {heightToDp} from '../utils/dimensions';

export type CreatorProps = {
  name: string;
  image: string;
  subs: string;
  id: string;
  onPress: () => void;
};

export default function Creator({
  name,
  image,
  onPress,
}: CreatorProps): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.imageView}>
        <Image source={{uri: image}} style={styles.image} />
      </View>
      <View style={styles.textView}>
        <Text style={styles.text}>{name}</Text>
        <Image
          style={{width: 15, height: 15, marginLeft: heightToDp(1)}}
          source={require('../../assets/images/thik.png')}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',

    height: heightToDp(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageView: {
    width: heightToDp(6),
    height: heightToDp(6),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: heightToDp(4),
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: heightToDp(1),
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
