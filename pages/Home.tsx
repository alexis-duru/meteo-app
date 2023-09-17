import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  Button,
  Image,
} from 'react-native';
import Layout from '../components/Layout';
import {useNavigation} from '@react-navigation/native';
import getWeather from '../services/Api'; // Assurez-vous que le chemin d'importation est correct
import React, {useState, useEffect} from 'react';

const Homepage = () => {
  const [weatherData, setWeatherData] = useState<any>(null);

  const {navigate}: any = useNavigation();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeather('Bordeaux'); // Remplacez par la ville de Bordeaux si nécessaire
        console.log('Données météorologiques :', data);
        setWeatherData(data);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des données météorologiques :',
          error,
        );
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <>
      <Layout>
        <SafeAreaView>
          <StatusBar />
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Home</Text>
              {weatherData ? (
                <>
                  <Text>Ville: {weatherData.city.name}</Text>
                  <Text>Date: {weatherData.list[0].dt_txt}</Text>
                  <Text>Température: {weatherData.list[0].main.temp} °C</Text>
                  <Text>
                    Météo: {weatherData.list[0].weather[0].description}
                  </Text>
                  <Image
                    source={{
                      uri: `https://openweathermap.org/img/w/${weatherData.list[0].weather[0].icon}.png`,
                    }}
                    style={{width: 50, height: 50}}
                  />
                </>
              ) : (
                <Text>Chargement des données météorologiques...</Text>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 24,
    height: 500,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'blue',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});

export default Homepage;
