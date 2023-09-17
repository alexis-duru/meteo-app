import {TextInput} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Button, Text, View} from 'react-native';
import getWeather from '../services/Api';

const Search = () => {
  const {navigate}: any = useNavigation();

  const [city, setCity] = useState('');

  const handleSearch = async () => {
    try {
      const data = await getWeather(city);
      // Mettez à jour l'état des données météorologiques ici
      console.log('Données météorologiques :', data);
      navigate('RESULTS', {weatherData: data});
    } catch (error) {
      console.error('Erreur lors de la recherche de météo :', error);
    }
  };

  return (
    <>
      <View>
        <TextInput
          placeholder="Entrez le nom de la ville"
          value={city}
          onChangeText={setCity}
        />
        <Button title="Rechercher" onPress={handleSearch} />
      </View>
    </>
  );
};

export default Search;
