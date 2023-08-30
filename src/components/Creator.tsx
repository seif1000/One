import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {heightToDp} from '../utils/dimensions';

export type CreatorProps = {
  name: string;
  image: string;
};

export default function Creator({name, image}: CreatorProps): JSX.Element {
  return (
    <View style={styles.container}>
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
    </View>
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
    width: heightToDp(7),
    height: heightToDp(7),
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
