import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useNavigation} from '@react-navigation/native';

const AddNotes = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const navigation = useNavigation();
  const saveNote = async () => {
    let x = [];
    let y = await EncryptedStorage.getItem('notes');
    let data = JSON.parse(y);

    data.data.map(item => {
      x.push(item);
    });
    x.push({title: title, desc: desc});
    await EncryptedStorage.setItem('notes', JSON.stringify({data: x}));
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Note Title"
        style={styles.input}
        value={title}
        onChangeText={txt => setTitle(txt)}
      />
      <TextInput
        placeholder="Enter Note Desc"
        style={styles.input}
        value={desc}
        onChangeText={txt => setDesc(txt)}
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          saveNote();
        }}>
        <Text style={styles.btnTxt}>Add Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNotes;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    height: 55,
    borderWidth: 0.5,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 30,
    paddingLeft: 20,
  },
  addBtn: {
    width: '90%',
    height: 55,
    borderRadius: 15,
    marginTop: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontSize: 20,
  },
});
