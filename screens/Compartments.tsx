import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { fonts } from '../constant/fonts';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useSelector } from '../redux/hook';
import { getCompartments } from '../util';
import Compartment from '../components/screen-component/compartments/Compartment';
import tw from 'twrnc';
import { Space } from '../constant/fridgeInfo';

interface RouteParams {
  route: { params: { space: Space } };
}

export default function Compartments({ route }: RouteParams) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const { space } = route.params;

  const [fontsLoaded] = useFonts(fonts);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: space });
  }, []);

  const compartments = getCompartments(fridgeInfo.compartments[space]);

  if (!fontsLoaded) return null;

  return (
    <View style={tw`flex-1 pt-4 pb-8 bg-neutral-50`}>
      <View
        style={tw`border flex-1 m-4 justify-between gap-3 p-3 border-slate-300 rounded-lg bg-neutral-200`}
      >
        {compartments.map((compartment) => (
          <Compartment
            key={compartment.compartmentNum}
            foodLocation={{ ...compartment, space }}
          />
        ))}
      </View>
    </View>
  );
}
