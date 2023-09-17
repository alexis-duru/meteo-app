import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Results = ({route}: any) => {
  const {weatherData} = route.params;

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Results;
