// App.tsx

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homepage from './pages/Home';
import Search from './pages/Search';
import Results from './pages/Results';
import Splashscreen from './pages/Splashcreen';
import Footer from './components/Navigation';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splashscreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SPLASHSCREEN" component={Splashscreen} />
        <Stack.Screen name="ACCUEIL" component={Homepage} />
        <Stack.Screen name="RECHERCHE" component={Search} />
        <Stack.Screen name="RÉSULTAT" component={Results} />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
}

export default App;
