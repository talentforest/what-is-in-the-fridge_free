import { useEffect } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { NavigateProp } from '../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';
import { PlatformIOS } from '../constant/statusBarHeight';

import Container from '../components/common/Container';
import HeaderBtn from '../components/buttons/HeaderBtn';
import AndroidFridge from '../components/fridge/AndroidFridge';
import IOSFridge from '../components/fridge/IOSFridge';
import tw from 'twrnc';

export default function MyFridge() {
  const { width } = useWindowDimensions();

  const navigation = useNavigation<NavigateProp>();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderBtn
          iconName='settings'
          type='Feather'
          onPress={() => navigation.navigate('FridgeSetting')}
          size={18}
        />
      ),
    });
  }, []);

  const fridgeWidth = width > 390 ? width * 0.8 : width * 0.9;

  return (
    <Container>
      <View style={tw`w-full flex-1 items-center justify-center`}>
        {PlatformIOS ? (
          <View
            style={tw`max-h-[660px] max-w-[400px] p-1 pb-3
            h-[${fridgeWidth * 1.4}px] w-[${fridgeWidth}px]`}
          >
            <IOSFridge />
          </View>
        ) : (
          <View style={tw`h-[${fridgeWidth * 1.445}px] w-[${fridgeWidth}px]`}>
            <AndroidFridge />
          </View>
        )}
      </View>
    </Container>
  );
}
