import {
  Button,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Splashscreen = () => {
  const image = require('../public/assets/images/splashscreen/splashscreen.jpg');

  const {navigate}: any = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}></View>
        <Text style={styles.title}>DAILY WEATHER</Text>
        <Text style={styles.subtitle}>
          Get To Know Your Weather Maps and radar precipitation forcast
        </Text>
        <Pressable style={styles.button} onPress={() => navigate('HOME')}>
          <Text style={styles.textButton}>Get Started</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    fontWeight: 'bold',
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
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
  },
  textButton: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default Splashscreen;
