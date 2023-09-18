import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';

const Results = ({route}: any) => {
  const {weatherData} = route.params;

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

  return (
    <View style={styles.container}>
      <View style={styles.wrapperWeatherDay}>
        <Text>Ville: {weatherData.city.name}</Text>
        <Text>Date: {weatherData.list[0].dt_txt}</Text>
        <Text>Température: {weatherData.list[0].main.temp} °C</Text>
        <Text>Météo: {weatherData.list[0].weather[0].description}</Text>
        <Image
          source={{
            uri: `https://openweathermap.org/img/w/${weatherData.list[0].weather[0].icon}.png`,
          }}
          style={{width: 50, height: 50}}
        />
      </View>
      <View style={styles.wrapperWeatherNextDays}>
        <Text>Prévisions météo pour les 7 prochains jours</Text>
        <ScrollView
          horizontal
          style={styles.galleryContainer}
          contentContainerStyle={styles.galleryContent}
          snapToAlignment="start"
          decelerationRate="fast"
          snapToInterval={150} // Largeur d'une prévision météo
        >
          {Object.entries(groupedWeatherData).map(
            ([date, weatherDataByDay]) => (
              <View key={date} style={styles.weatherCard}>
                <Text>Date: {date}</Text>
                <Text>Température: {weatherDataByDay[0].main.temp} °C</Text>
                <Text>Météo: {weatherDataByDay[0].weather[0].description}</Text>
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
  );
};

const styles = StyleSheet.create({
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
});

export default Results;
