import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import Layout from '../components/Layout';
import {useNavigation} from '@react-navigation/native';

const Homepage = () => {
  const {navigate}: any = useNavigation();
  return (
    <>
      <Layout>
        <SafeAreaView>
          <StatusBar />
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Homepage</Text>
              <Text style={styles.sectionDescription}>
                This is the homepage.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 24,
    height: 500,
    backgroundColor: 'lightblue',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'blue',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});

export default Homepage;
