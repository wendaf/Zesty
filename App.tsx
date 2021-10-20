import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';

export default function App() {
  const [initialElements, changeEl]  = useState([{ id : "0", text : "Hello world", image: "https://coffee.alexflipnote.dev/mVOd9yC1u3E_coffee.jpg"}]);
  const [dataState, setDataState] = useState(initialElements);
  const [idx, incr] = useState(2);
  const [text, setText] = useState('');

  const addElement = (file: any) => {
    const newArray = [...initialElements, {id: idx, text: text , image: file}];
    incr(idx + 1);
    setDataState(newArray);
    changeEl(newArray);
  }

  const onPress = () => {
    (async () => {
      const response = await fetch('https://coffee.alexflipnote.dev/random.json').then(response => response.json());
      addElement(response.file);
    })();
  };
  return (
  <SafeAreaView style={styles.container}>
    <TextInput style={styles.text} placeholder="Quoi de neuf ?" onChangeText={text => setText(text)}/>

    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>Publier</Text>
    </TouchableOpacity>

    <ScrollView>
      <FlatList
          inverted
          keyExtractor = {item => item.id}
          data={dataState}
          renderItem = {item => (
              <>
                <Image
                    style={{width: '100%', height: 160}}
                    source={{uri: item.item.image}}/>
                <Text>
                  {"\n"}
                  {item.item.text}
                  {"\n"}
                </Text>
              </>
          )}
      />
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,

  },
  text: {
    backgroundColor: '#FBF8F7',
    height: 65,
    borderRadius: 10,
    padding: 10
},
  button: {
    left: 230,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F4D03F',
    width: 100,
    marginBottom: 10
  },
  buttonText: {
    color: "white",
    textAlign: 'center',
    fontWeight: "bold"
  }
});
