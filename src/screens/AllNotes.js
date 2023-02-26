import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

const AllNotes = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [allNotes, setAllNotes] = useState([]);
  useEffect(() => {
    getAllNotes();
  }, [isFocused]);
  const getAllNotes = async () => {
    let x = [];
    let y = await EncryptedStorage.getItem('notes');
    let data = JSON.parse(y);

    data.data.map(item => {
      x.push(item);
    });
    setAllNotes(x);
  };
  const deleteNote = async index => {
    let temp = allNotes;
    let x = [];
    temp.map((item, ind) => {
      if (ind !== index) {
        x.push(item);
      }
    });

    // let newList = temp.filter((item, ind) => {
    //   return ind !== index;
    // });

    await EncryptedStorage.setItem('notes', JSON.stringify({data: x}));
    getAllNotes();
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={allNotes}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                marginTop: 20,
                borderRadius: 10,
                backgroundColor: '#fff',
                height: 100,
              }}>
              <Text style={{fontSize: 25, fontWeight: '700', margin: 10}}>
                {item.title}
              </Text>
              <Text style={{fontSize: 20, fontWeight: '700', marginLeft: 10}}>
                {item.desc}
              </Text>

              <Text
                style={{
                  position: 'absolute',
                  right: 20,
                  top: 20,
                  borderWidth: 0.5,
                  borderColor: 'red',
                  borderRadius: 10,
                  padding: 10,
                  color: 'red',
                }}
                onPress={() => {
                  deleteNote(index);
                }}>
                Delete
              </Text>
            </View>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          navigation.navigate('AddNotes');
        }}>
        <Text style={styles.btntxt}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AllNotes;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000',
    position: 'absolute',
    right: 20,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntxt: {
    color: '#fff',
    fontSize: 30,
  },
});
