import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text>Header Component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'lightblue',
    padding: 10,
  },
});

export default Header;
