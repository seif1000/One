import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../utils/colors';
import Button from '../../components/Button';
import {heightToDp, widthToDp} from '../../utils/dimensions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Signup() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signIn = () => {
    setIsLoading(true);
    auth()
      .signInAnonymously()
      .then(user => {
        firestore()
          .collection('Users')
          .doc(user.user.uid)
          .set({
            _id: user.user.uid,
            createdAt: new Date().getTime(),
            followings: [],
            videos: [],
          })
          .then(() => {
            console.log('User added!');
          });

        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  };
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
          onPress={() => {
            signIn();
          }}
          isLoading={isLoading}
          disabled={isLoading}
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
