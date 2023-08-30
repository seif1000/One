import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../../utils/colors';
import Input from '../../components/Input';
import {heightToDp} from '../../utils/dimensions';
import Creator, {CreatorProps} from '../../components/Creator';
import youtub from '../../api/youtub';

export default function Serach() {
  const [search, setSearch] = React.useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await youtub.get('/search');
        console.log('====================================');
        console.log(response.data.items[0]);
        console.log('====================================');
      } catch (error) {
        console.log(error);
      }
    })();
  });
  return (
    <SafeAreaView style={styles.container}>
      <Input
        handleChange={val => setSearch(val)}
        handleBlur={() => {}}
        value={search}
        placeholder={'Search'}
      />
      <Text style={styles.title}>Creators</Text>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({index, item}: {index: number; item: CreatorProps}) => {
          return (
            <Creator
              name={'Yusuf truth'}
              image={
                'https://thumbs.dreamstime.com/b/handsome-man-black-suit-white-shirt-posing-studio-attractive-guy-fashion-hairstyle-confident-man-short-beard-125019349.jpg'
              }
            />
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
  title: {
    fontSize: 20,
    color: Colors.WHITE,
    marginVertical: heightToDp(3),
  },
});
