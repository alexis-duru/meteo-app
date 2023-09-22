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
import getWeather from '../services/openWeatherApi';
import getPlaces from '../services/countriesNowApi';

const Search = () => {
  const {navigate}: any = useNavigation();

  const [city, setCity] = useState('');
  const [citiesList, setCitiesList] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchCitiesList = async () => {
    try {
      const data = await getPlaces(city.toUpperCase());
      console.log('Fetch City List:', data);
      const cityNames = data.map((entry: any) => entry.city);
      setCitiesList(cityNames);
    } catch (error) {
      console.error('Erreur lors de la récupération des villes :', error);
    }
  };

  useEffect(() => {
    fetchCitiesList();
  }, [city]);

  const handleInputChange = async (text: any) => {
    setCity(text);

    try {
      const data = await getPlaces(text.toUpperCase());
      const cityNames = data.map((entry: any) => entry.city);
      setSuggestions(cityNames);
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des suggestions de villes :',
        error,
      );
    }
  };

  const handleSuggestionSelect = (selectedCity: any) => {
    setCity(selectedCity);
    setSuggestions([]);
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
            onChangeText={handleInputChange}
            style={styles.input}
            onSubmitEditing={handleSubmit}
          />
          <Pressable style={styles.button} onPress={handleSearch}>
            <Text style={styles.textButton}>Rechercher</Text>
          </Pressable>
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              keyExtractor={(item: any) => item.toString()}
              renderItem={({item}: any) => (
                <Pressable
                  style={styles.suggestionItem}
                  onPress={() => handleSuggestionSelect(item)}>
                  <Text>{item}</Text>
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
  suggestionsContainer: {
    position: 'absolute',
    top: 60,
    left: 10,
    width: '90%',
    backgroundColor: 'white',
    zIndex: 1,
    borderRadius: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});
