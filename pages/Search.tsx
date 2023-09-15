import {useNavigation} from '@react-navigation/native';
import {Button, Text, View} from 'react-native';

const Search = () => {
  const {navigate}: any = useNavigation();

  return (
    <>
      <View>
        <Text>Search</Text>
      </View>
    </>
  );
};

export default Search;
