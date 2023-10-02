import {TextInput} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import getPlaces from '../services/geoGouvApi';
import getWeather from '../services/openWeatherApi';
import Layout from '../components/Layout';
import {act} from 'react-test-renderer';

interface CitySuggestion {
  name: string;
  postalCode: string;
}

const Search = () => {
  const image = require('../public/assets/images/splashscreen/splashscreen.jpg');

  const {navigate}: any = useNavigation();

  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [recentCities, setRecentCities] = useState<string[]>([]);

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

  const handleSuggestionSelect = async (
    selectedCity: string,
    postalCode: string,
  ) => {
    setCity(selectedCity);
    setPostalCode(postalCode);
    setSuggestions([]);
    await handleSearch();
  };

  const handleSearch = async () => {
    try {
      const data = await getWeather(city);
      console.log('Données météorologiques :', data);

      if (
        !recentCities.some(
          recentCity => recentCity.toLowerCase() === city.toLowerCase(),
        )
      ) {
        setRecentCities(prevCities => {
          if (!prevCities.includes(city)) {
            return [city, ...prevCities.slice(0, 4)];
          }
          return prevCities;
        });
      }

      navigate('RÉSULTAT', {weatherData: data});
    } catch (error) {
      console.error('Erreur lors de la recherche de météo :', error);
    }
  };

  const handleClearRecentCities = () => {
    setRecentCities([]);
  };

  const handleSubmit = () => {
    handleSearch();
  };

  const handleRecentCityPress = async (selectedCity: string) => {
    setCity(selectedCity);
    setSuggestions([]);
    await handleSearch();
  };

  return (
    <>
      <Layout>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.overlay}></View>
          <View style={styles.container}>
            <View style={styles.wrapperBtn}>
              <TextInput
                placeholder="Entrez le nom de la ville"
                value={city}
                onChangeText={setCity}
                style={styles.input}
                onSubmitEditing={handleSubmit}
              />
              {suggestions.length > 0 && (
                <FlatList
                  style={styles.flatList}
                  data={suggestions}
                  keyExtractor={item => `${item.name}-${item.postalCode}`}
                  renderItem={({item}) => (
                    <Pressable
                      key={`${item.name}-${item.postalCode}`}
                      style={styles.suggestionItem}
                      onPress={() =>
                        handleSuggestionSelect(item.name, item.postalCode)
                      }>
                      <Text>
                        {item.name}, {item.postalCode}
                      </Text>
                    </Pressable>
                  )}
                />
              )}
            </View>
            <View style={styles.recentCitiesContainer}>
              <Text style={styles.recentCitiesTitle}>
                Villes recherchées récemment :
              </Text>
              {recentCities.length > 0 && (
                <>
                  {recentCities.map((recentCity, index) => (
                    <Pressable
                      key={index}
                      style={styles.recentCityCard}
                      onPress={() => handleRecentCityPress(recentCity)}>
                      <Text>{recentCity}</Text>
                    </Pressable>
                  ))}
                  <Pressable
                    style={styles.clearButton}
                    onPress={handleClearRecentCities}>
                    <Text style={styles.clearButtonText}>Clear</Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </ImageBackground>
      </Layout>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    marginBottom: 10,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  wrapperBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    width: '100%',
    height: 50,
    marginTop: 50,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  flatList: {
    width: '100%',
    paddingHorizontal: 10,
    maxHeight: 200,
    backgroundColor: 'transparent',
    borderRadius: 5,
  },
  button: {
    width: '100%',
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
    width: '100%',
    backgroundColor: 'white',
  },
  recentCitiesContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  recentCitiesTitle: {
    fontSize: 16,
    fontWeight: '300',
    alignSelf: 'flex-start',
    color: 'white',
  },
  recentCityCard: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  clearButton: {
    padding: 10,
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
