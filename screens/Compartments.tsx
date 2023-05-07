import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { fonts } from '../constant/fonts';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import Compartment from '../components/screen-component/compartments/Compartment';
import tw from 'twrnc';

export default function Compartments({ route }: any) {
  const [fontsLoaded] = useFonts(fonts);
  const navigation = useNavigation();
  const { space } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: space,
    });
  }, [navigation]);

  const getCompartments = (numOfItems: number) => {
    return Array.from({ length: numOfItems }, (_, index) => {
      return { name: `${index + 1}번 ${space.slice(0, 2)}칸` };
    });
  };
  const compartments = space.includes('냉동')
    ? getCompartments(2)
    : getCompartments(3);

  if (!fontsLoaded) return null;

  return (
    <View style={tw`px-4 pt-4 pb-8 flex-1`}>
      <View
        style={tw`border flex-1 justify-between gap-3 p-3 border-slate-500 rounded-lg bg-stone-300`}
      >
        {compartments.map((compartment, index) => (
          <Compartment
            key={compartment.name}
            space={space}
            compartmentName={compartment.name}
            index={index}
          />
        ))}
      </View>
    </View>
  );
}
