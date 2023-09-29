import {Text, View, StyleSheet, Image, ImageBackground} from 'react-native';
import Layout from '../components/Layout';
import {useNavigation} from '@react-navigation/native';
import getWeather from '../services/openWeatherApi';
import React, {useState, useEffect} from 'react';
import formatedDateToFrench from '../utils/formatedDateToFrench';

const Homepage = () => {
  const image = require('../public/assets/images/splashscreen/splashscreen.jpg');

  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeather('Bordeaux');
        console.log('Information de Bordeaux:', data);
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
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.overlay}></View>

          <View style={styles.wrapper}>
            {weatherData ? (
              <>
                <Text style={styles.time}>
                  {formatedDateToFrench(weatherData.list[0].dt_txt)}
                </Text>
                <Text style={styles.title}>{weatherData.city.name}</Text>
                <Text style={styles.subtitle}>
                  {Math.round(weatherData.list[0].main.temp)} °C
                </Text>
                <Text style={styles.infos}>
                  {weatherData.list[0].weather[0].description
                    .charAt(0)
                    .toUpperCase() +
                    weatherData.list[0].weather[0].description.slice(1)}
                </Text>
              </>
            ) : (
              <Text>Chargement des données météorologiques...</Text>
            )}
          </View>
        </ImageBackground>
      </Layout>
    </>
  );
};

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
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 40,
    fontWeight: '200',
    color: 'white',
  },
  subtitle: {
    fontSize: 60,
    color: 'white',
    textAlign: 'center',
    fontWeight: '300',
  },
  time: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    fontWeight: '400',
  },
  infos: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: '300',
  },
});

export default Homepage;
