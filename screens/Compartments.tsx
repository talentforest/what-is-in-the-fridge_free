import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { fonts } from '../constant/fonts';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { CompartmentType } from '../constant/fridgeInfo';
import Compartment from '../components/screen-component/compartments/Compartment';
import tw from 'twrnc';

export default function Compartments({ route }: any) {
  const { space } = route.params;
  const [fontsLoaded] = useFonts(fonts);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: space });
  }, []);

  const getCompartments = (numOfItems: number) => {
    return Array.from({ length: numOfItems }, (_, index) => {
      const compartmentNum = `${index + 1}번`;
      return { space, compartmentNum } as CompartmentType;
    });
  };

  const compartments = space.includes('냉동')
    ? getCompartments(2)
    : getCompartments(3);

  if (!fontsLoaded) return null;

  return (
    <View style={tw`flex-1 pt-4 pb-8 bg-neutral-50`}>
      <View style={tw`p-4 flex-1`}>
        <View
          style={tw`border flex-1 justify-between gap-3 p-3 border-slate-300 rounded-lg bg-stone-200`}
        >
          {compartments.map((compartment) => (
            <Compartment
              key={compartment.compartmentNum}
              compartment={compartment}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
