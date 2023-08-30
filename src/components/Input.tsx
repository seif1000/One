import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {heightToDp, widthToDp} from '../utils/dimensions';
import {Colors} from '../utils/colors';

type Props = {
  handleChange: (text: string) => void;
  handleBlur: (e: any) => void;
  value: string;
  placeholder: string;
};

const Input = ({handleBlur, handleChange, value, placeholder}: Props) => {
  return (
    <View style={{marginTop: heightToDp(4)}}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: widthToDp(3),
          zIndex: 100,
          top: heightToDp(1.75),
        }}>
        <Image
          source={require('../../assets/images/search.png')}
          style={styles.searchImage}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.conatiner}
        placeholder={placeholder}
        onChangeText={handleChange}
        placeholderTextColor={Colors.GRAY}
        onBlur={handleBlur}
        value={value}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  conatiner: {
    width: '100%',
    height: heightToDp(6),
    backgroundColor: Colors.DARK_GRAY,
    borderRadius: 5,

    paddingLeft: widthToDp(10),
    paddingRight: widthToDp(4),
    color: Colors.WHITE,
  },
  searchImage: {
    width: widthToDp(6),
    height: heightToDp(2.5),
    marginRight: widthToDp(2),
  },
});
export default Input;
