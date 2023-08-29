import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors';
import Button from '../../components/Button';
import {heightToDp, widthToDp} from '../../utils/dimensions';

export default function Signup() {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/one.png')} />
      <Text style={styles.text}>the everything app for videos</Text>
      <View style={styles.buttonContainer}>
        <Button
          text={'Continue with Apple'}
          withIcon={true}
          backgroundColor={Colors.WHITE}
          textColor={Colors.BLACK}
          onPress={() => {}}
          isLoading={false}
          disabled={false}
          icon={require('../../../assets/images/apple.png')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    paddingHorizontal: widthToDp(2.5),
    justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    color: Colors.GRAY,
    marginTop: heightToDp(2),
    fontSize: widthToDp(5.5),
  },

  buttonContainer: {
    position: 'absolute',
    bottom: heightToDp(5),
    // left: widthToDp(2.5),
  },
});
