import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootStackParamListApp, TabParamList} from '../../utils/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors} from '../../utils/colors';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamListApp>
>;

export default function Home({navigation, route}: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
});
