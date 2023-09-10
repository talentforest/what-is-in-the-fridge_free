import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { NavigateProp } from '../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from '../components/common/native-component';
import { DEVICE_HEIGHT } from '../util';

import Container from '../components/common/Container';
import Fridge from '../components/common/Fridge';
import SearchFoodModal from '../screen-component/modal/SearchFoodModal';
import HeaderBtn from '../components/buttons/HeaderBtn';
import Icon from '../components/common/native-component/Icon';
import tw from 'twrnc';

export default function MyFridge() {
  const navigation = useNavigation<NavigateProp>();
  const [modalVisible, setModalVisible] = useState(false);

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

  const gap = DEVICE_HEIGHT < 700 ? 2 : DEVICE_HEIGHT < 1000 ? 4 : 8;

  return (
    <Container>
      <View style={tw`flex-1 gap-${gap} items-center w-full h-full`}>
        <View style={tw`w-full `}>
          <Pressable
            onPressOut={() => setModalVisible(true)}
            style={tw`shadow-md`}
          >
            <TextInput
              editable={false}
              style={tw`h-11 pl-9`}
              placeholder='냉장고에 식료품이 있는지 검색해보세요.'
              onPressOut={() => setModalVisible(true)}
            />
          </Pressable>
          <View style={tw`absolute left-2.5 h-full justify-center`}>
            <Icon name='search' type='Ionicons' size={19} />
          </View>
        </View>

        <View style={tw`flex-1 items-center justify-center`}>
          <View style={tw`max-h-[540px] flex-1 p-1 pb-3 shadow-lg`}>
            <Fridge />
          </View>
        </View>
      </View>

      {modalVisible && (
        <SearchFoodModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </Container>
  );
}
