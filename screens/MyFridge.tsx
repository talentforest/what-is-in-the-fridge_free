import { useEffect } from 'react';
import { View } from 'react-native';
import { NavigateProp } from '../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';

import Container from '../components/common/Container';
import Fridge from '../components/common/Fridge';
import HeaderBtn from '../components/buttons/HeaderBtn';
import tw from 'twrnc';

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

  return (
    <Container>
      <View style={tw`flex-1 items-center justify-center`}>
        <View style={tw`max-h-[510px] flex-1 p-1 pb-3`}>
          <Fridge />
        </View>
      </View>
    </Container>
  );
}
