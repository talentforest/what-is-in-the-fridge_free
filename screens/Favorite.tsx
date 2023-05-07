import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { Text } from '../components/native-component';
import { fonts } from '../constant/fonts';
import tw from 'twrnc';

const Favorite = () => {
  const [fontsLoaded] = useFonts(fonts);
  if (!fontsLoaded) return null;

  return (
    <View style={tw`flex-1 bg-indigo-50 items-center justify-center`}>
      <Text>Favorite</Text>
    </View>
  );
};

export default Favorite;
