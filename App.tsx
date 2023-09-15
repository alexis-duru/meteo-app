/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  TextInput,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // Fetch une api ouverte pour afficher des données
  // const [data, setData] = useState({hits: []});

  // useEffect(() => {
  //   fetch('https://hn.algolia.com/api/v1/search?query=react')
  //     .then(response => response.json())
  //     .then(result => setData(result))
  //     .catch(error => console.error(error));
  // }, []);

  const [value, setValue] = useState(0);
  const [items, setItems] = useState([
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
    {id: 3, name: 'Item 3'},
    {id: 4, name: 'Item 4'},
  ]);
  const [inputValues, setInputValues] = useState(
    items.map(item => ({id: item.id, value: ''})),
  );

  const increment = (amount: number) => {
    setValue(value + amount);
  };

  const deleteItem = (id: number) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  const updateItem = (id: number) => {
    // Obtenez la valeur d'input correspondant à l'élément avec l'id donné
    const inputValue = inputValues.find(input => input.id === id)?.value;

    if (inputValue !== undefined) {
      // Mettre à jour la liste des articles avec la nouvelle valeur de l'input pour l'élément correspondant
      const updatedItems = items.map(item => {
        if (item.id === id) {
          return {...item, name: inputValue};
        }
        return item;
      });
      // Mettre à jour la liste des articles
      setItems(updatedItems);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button title="Increment" onPress={() => increment(1)} />
          <Button title="Decrement" onPress={() => increment(-1)} />
          <Text>Value: {value}</Text>
          {items.map(item => (
            <View key={item.id}>
              <TextInput
                value={inputValues.find(input => input.id === item.id)?.value}
                onChangeText={text => {
                  // Mettre à jour la valeur d'input correspondant à l'élément avec l'id donné
                  setInputValues(prevInputValues =>
                    prevInputValues.map(input =>
                      input.id === item.id ? {...input, value: text} : input,
                    ),
                  );
                }}
                placeholder="New Value"
              />
              <Text>{item.name}</Text>
              <Button title="Delete" onPress={() => deleteItem(item.id)} />
              <Button title="Update" onPress={() => updateItem(item.id)} />
            </View>
          ))}
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
