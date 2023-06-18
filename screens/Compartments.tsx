import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { fonts } from '../constant/fonts';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useSelector } from '../redux/hook';
import { getCompartments, scaleH } from '../util';
import { Space } from '../constant/fridgeInfo';
import { RootStackParamList } from '../navigation/Navigation';
import Compartment from '../components/screen-component/compartments/Compartment';
import tw from 'twrnc';

interface RouteParams {
  route: RouteProp<RootStackParamList, 'Compartments'>;
}

export default function Compartments({ route }: RouteParams) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const { space } = route.params as { space: Space };

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
        style={tw`p-[${scaleH(10)}] gap-[${scaleH(
          3
        )}] border w-[90%] m-auto flex-1 mt-3 mb-4 justify-between border-slate-300 rounded-lg bg-neutral-200`}
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
