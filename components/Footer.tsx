import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <Text>Footer Component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
  },
});

export default Footer;
