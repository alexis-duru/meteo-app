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
              {Math.round(weatherData.list[0].main.temp)} °C
            </Text>
            <Image
              source={{
                uri: `https://openweathermap.org/img/w/${weatherData.list[0].weather[0].icon}.png`,
              }}
              style={{width: 50, height: 50}}
            />
          </View>
          <View style={styles.wrapperWeatherNextDays}>
            <Text style={styles.sm__title}>Heure par heure</Text>
            <ScrollView
              horizontal
              style={styles.galleryContainer}
              contentContainerStyle={styles.galleryContent}
              snapToAlignment="start"
              decelerationRate="fast"
              snapToInterval={150}>
              {todayWeatherData.map((hourlyWeather: any, index: number) => (
                <View key={index} style={styles.weatherCard}>
                  <Text style={(styles.nextInfos, styles.nextInfos__sm)}>
                    {hourlyWeather.dt_txt.split(' ')[1]}
                  </Text>
                  <Text style={styles.nextInfos}>
                    {Math.round(hourlyWeather.main.temp)} °C
                  </Text>
                  <Text style={(styles.nextInfos, styles.nextInfos__sm)}>
                    {hourlyWeather.weather[0].description
                      .charAt(0)
                      .toUpperCase() +
                      hourlyWeather.weather[0].description.slice(1)}
                  </Text>
                  <Image
                    source={{
                      uri: `https://openweathermap.org/img/w/${hourlyWeather.weather[0].icon}.png`,
                    }}
                    style={{width: 30, height: 30}}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.wrapperWeatherNextDays}>
            <Text style={styles.sm__title}>Les 7 prochains jours</Text>
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
                    <Text style={(styles.nextInfos, styles.nextInfos__sm)}>
                      {formatedDateToFrench(weatherDataByDay[0].dt_txt)}
                    </Text>
                    <Text style={styles.nextInfos}>
                      {Math.round(weatherDataByDay[0].main.temp)} °C
                    </Text>
                    <Text style={(styles.nextInfos, styles.nextInfos__sm)}>
                      {weatherDataByDay[0].weather[0].description
                        .charAt(0)
                        .toUpperCase() +
                        weatherDataByDay[0].weather[0].description.slice(1)}
                    </Text>
                    <Image
                      source={{
                        uri: `https://openweathermap.org/img/w/${weatherDataByDay[0].weather[0].icon}.png`,
                      }}
                      style={{width: 30, height: 30}}
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
    width: '100%',
    paddingTop: 40,
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
    scrollSnapType: 'x mandatory',
    maxHeight: 150,
  },
  wrapperWeatherDay: {
    height: 170,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    scrollBarWidth: 'none',
  },
  wrapperWeatherNextDays: {
    height: 200,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingStart: 20,
  },
  weatherCard: {
    width: 150,
    height: 120,
    padding: 10,
    borderRadius: 5,
    marginEnd: 10,
    scrollSnapAlign: 'start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  sm__title: {
    fontSize: 20,
    color: 'white',
    textAlign: 'left',
    fontWeight: '300',
  },
  title: {
    fontSize: 30,
    fontWeight: '200',
    color: 'white',
  },
  subtitle: {
    fontSize: 50,
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
  nextInfos: {
    fontSize: 15,
    marginBottom: 5,
    color: 'white',
    textAlign: 'center',
    fontWeight: '300',
  },
  nextInfos__sm: {
    fontSize: 12,
    marginBottom: 5,
    color: 'white',
    textAlign: 'center',
    fontWeight: '300',
  },
});

export default Results;
