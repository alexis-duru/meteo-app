import {TextInput} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import getPlaces from '../services/geoGouvApi'; // Importez les fonctions depuis api.js
import getWeather from '../services/openWeatherApi'; // Importez les fonctions depuis api.js

const Search = () => {
  const {navigate}: any = useNavigation();

  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchCitiesList = async (cityName: string) => {
    try {
      const cityNames = await getPlaces(cityName);
      setSuggestions(cityNames);
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des suggestions de villes :',
        error,
      );
    }
  };

  useEffect(() => {
    if (city.length > 0) {
      fetchCitiesList(city);
    } else {
      setSuggestions([]);
    }
  }, [city]);

  const handleSuggestionSelect = async (selectedCity: string) => {
    setCity(selectedCity);
    setSuggestions([]);
    await handleSearch();
  };

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
            onSubmitEditing={handleSubmit}
          />
          {/* <Pressable style={styles.button} onPress={handleSearch}>
            <Text style={styles.textButton}>Rechercher</Text>
          </Pressable> */}
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions.map((item, index) => ({item, index}))} // Créez une liste d'objets avec index
              keyExtractor={item => `${item.item}-${item.index}`} // Utilisez la combinaison de nom de ville et d'index unique comme clé
              renderItem={({item}: {item: {item: string; index: number}}) => (
                <Pressable
                  key={`${item.item}-${item.index}`} // Assurez-vous que la clé est unique
                  style={styles.suggestionItem}
                  onPress={() => handleSuggestionSelect(item.item)}>
                  <Text>{item.item}</Text>
                </Pressable>
              )}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'lightblue',
  },
  wrapperBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    width: 250,
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    width: 250,
  },
});
