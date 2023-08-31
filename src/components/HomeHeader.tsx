import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {heightToDp, widthToDp} from '../utils/dimensions';
import {Colors} from '../utils/colors';
import auth from '@react-native-firebase/auth';

type Props = {
  onPress: () => void;
};

export default function HomeHeader({onPress}: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.oneImage}
          source={require('../../assets/images/one.png')}
        />
      </View>
      <View style={styles.leftView}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require('../../assets/images/search.png')}
            style={styles.searchImage}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.user}
          onPress={() => {
            auth().signOut().then();
          }}></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthToDp(100),
    height: heightToDp(8),
    //backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: widthToDp(5),
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchImage: {
    width: widthToDp(6),
    height: heightToDp(2.5),
    marginRight: widthToDp(2),
  },
  oneImage: {
    width: widthToDp(15),
    height: heightToDp(2.55),
  },
  user: {
    width: widthToDp(6),
    height: widthToDp(6),
    borderRadius: widthToDp(3),
    backgroundColor: Colors.GRAY,
  },
});
