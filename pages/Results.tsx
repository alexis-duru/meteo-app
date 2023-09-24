import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import formatedDateToFrench from '../utils/formatedDateToFrench';
import Layout from '../components/Layout';

const Results = ({route}: any) => {
  const image = require('../public/assets/images/splashscreen/splashscreen.jpg');

  const {weatherData} = route.params;

  console.log('Données météorologiques :', weatherData);

  const groupDataByDay = (data: any[]) => {
    const groupedData: {[key: string]: any[]} = {};

    data.forEach((weather: any) => {
      const date = weather.dt_txt.split(' ')[0];
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(weather);
    });

    return groupedData;
  };

  const groupedWeatherData = groupDataByDay(weatherData.list);

  const today = new Date().toISOString().split('T')[0];
  const todayWeatherData = groupedWeatherData[today];

  return (
    <Layout>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}></View>
        <View style={styles.container}>
          <View style={styles.wrapperWeatherDay}>
            <Text style={styles.time}>
              {formatedDateToFrench(weatherData.list[0].dt_txt)}
            </Text>
            <Text style={styles.title}>{weatherData.city.name}</Text>
            <Text style={styles.subtitle}>
              {(weatherData.list[0].main.temp - 273.15).toFixed(2)} °C
            </Text>
            <Image
              source={{
                uri: `https://openweathermap.org/img/w/${weatherData.list[0].weather[0].icon}.png`,
              }}
              style={{width: 50, height: 50}}
            />
          </View>
          {/* <View style={styles.wrapperWeatherNextDays}>
        <Text>Météo heure par heure pour aujourd'hui</Text>
        <ScrollView
          horizontal
          style={styles.galleryContainer}
          contentContainerStyle={styles.galleryContent}
          snapToAlignment="start"
          decelerationRate="fast"
          snapToInterval={150}>
          {todayWeatherData.map((hourlyWeather: any, index: number) => (
            <View key={index} style={styles.weatherCard}>
              <Text>Heure: {hourlyWeather.dt_txt.split(' ')[1]}</Text>
              <Text>
                Température: {(hourlyWeather.main.temp - 273.15).toFixed(2)} °C
              </Text>
              <Text>Météo: {hourlyWeather.weather[0].description}</Text>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/w/${hourlyWeather.weather[0].icon}.png`,
                }}
                style={{width: 50, height: 50}}
              />
            </View>
          ))}
        </ScrollView>
      </View> */}
          <View style={styles.wrapperWeatherNextDays}>
            <Text>Prévisions météo pour les 7 prochains jours</Text>
            <ScrollView
              horizontal
              style={styles.galleryContainer}
              contentContainerStyle={styles.galleryContent}
              snapToAlignment="start"
              decelerationRate="fast"
              snapToInterval={150}>
              {Object.entries(groupedWeatherData).map(
                ([date, weatherDataByDay]) => (
                  <View key={date} style={styles.weatherCard}>
                    <Text>Date: {date}</Text>
                    <Text>
                      Température:{' '}
                      {(weatherDataByDay[0].main.temp - 273.15).toFixed(2)} °C
                    </Text>
                    <Text>
                      Météo: {weatherDataByDay[0].weather[0].description}
                    </Text>
                    <Image
                      source={{
                        uri: `https://openweathermap.org/img/w/${weatherDataByDay[0].weather[0].icon}.png`,
                      }}
                      style={{width: 50, height: 50}}
                    />
                  </View>
                ),
              )}
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </Layout>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  galleryContainer: {
    marginTop: 20,
  },
  galleryContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 20,
    paddingEnd: 20,
    paddingBottom: 20,
    scrollSnapType: 'x mandatory',
    maxHeight: 200,
  },
  wrapperWeatherDay: {
    height: '50%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperWeatherNextDays: {
    height: '50%',
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  weatherCard: {
    width: 150,
    padding: 10,
    border: '1px solid lightgray',
    borderRadius: 5,
    marginEnd: 10,
    scrollSnapAlign: 'start',
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

export default Results;
