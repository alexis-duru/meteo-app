// Footer.tsx

import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const links = [
  {
    name: 'ACCUEIL',
    component: 'Homepage',
    imgUri: require('../public/assets/images/navigation/home.png'),
  },
  {
    name: 'RECHERCHE',
    component: 'Search',
    imgUri: require('../public/assets/images/navigation/search.png'),
  },
];

const Footer: React.FC = () => {
  const {navigate}: any = useNavigation();

  return (
    <View style={styles.footer}>
      {links.map(link => (
        <TouchableOpacity key={link.name} onPress={() => navigate(link.name)}>
          <Image source={link.imgUri} style={styles.link} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'black',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    flexDirection: 'row',
  },
  link: {
    width: 40,
    height: 40,
    margin: 10,
    tintColor: 'white',
  },
});

export default Footer;
