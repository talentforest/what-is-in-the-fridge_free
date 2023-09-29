import { useEffect } from 'react';
import { View } from 'react-native';
import { NavigateProp } from '../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';

import Container from '../components/common/Container';
import Fridge from '../components/common/Fridge';
import HeaderBtn from '../components/buttons/HeaderBtn';
import tw from 'twrnc';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../util';

export default function MyFridge() {
  const navigation = useNavigation<NavigateProp>();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderBtn
          iconName={'cog'}
          type='MaterialCommunityIcons'
          onPress={() => navigation.navigate('FridgeSetting')}
          size={22}
        />
      ),
    });
  }, []);

  const fridgeWidth = DEVICE_WIDTH * 0.9;

  return (
    <Container>
      <View style={tw`flex-1 items-center justify-center`}>
        <View
          style={tw`max-h-[660px] max-w-[400px]
          h-[${fridgeWidth * 1.65}px] w-[${fridgeWidth}px] p-1 pb-3`}
        >
          <Fridge />
        </View>
      </View>
    </Container>
  );
}
