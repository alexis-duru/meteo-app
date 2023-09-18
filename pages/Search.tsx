import {TextInput} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';
import getWeather from '../services/Api';

const Search = () => {
  const {navigate}: any = useNavigation();

  const [city, setCity] = useState('');

  const handleSearch = async () => {
    try {
      const data = await getWeather(city);
      console.log('Données météorologiques :', data);
      navigate('RESULTS', {weatherData: data});
    } catch (error) {
      console.error('Erreur lors de la recherche de météo :', error);
    }
  };

  const handleSubmit = () => {
    handleSearch();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapperBtn}>
          <TextInput
            placeholder="Entrez le nom de la ville"
            value={city}
            onChangeText={setCity}
            style={styles.input}
            onSubmitEditing={handleSubmit} // Utilisez onSubmitEditing pour détecter la touche "Entrée"
          />
          <Pressable style={styles.button} onPress={handleSearch}>
            <Text style={styles.textButton}>Rechercher</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'lightblue',
  },
  wrapperBtn: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    width: 250,
    height: 50,
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: '#000',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
});
