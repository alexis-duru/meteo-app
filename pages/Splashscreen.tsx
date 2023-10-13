import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Splashscreen = () => {
  const image = require('../public/assets/images/splashscreen/splashscreen.jpg');

  const {navigate}: any = useNavigation();

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <View style={styles.overlay}></View>
        <Text style={styles.title}>METEO APP</Text>
        <Text style={styles.subtitle}>La météo de votre ville</Text>
        <Pressable style={styles.button} onPress={() => navigate('ACCUEIL')}>
          <Text style={styles.textButton}>Commencer</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  title: {
    fontSize: 24,
    fontWeight: '300',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 10,
    marginTop: 20,
  },
  textButton: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
export default Splashscreen;
