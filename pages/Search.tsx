import {useNavigation} from '@react-navigation/native';
import {Button, Text, View} from 'react-native';

const Search = () => {
  const {navigate}: any = useNavigation();

  return (
    <>
      <View>
        <Text>Search</Text>
        <Button title="Results" onPress={() => navigate('RESULTS')} />
      </View>
    </>
  );
};

export default Search;
