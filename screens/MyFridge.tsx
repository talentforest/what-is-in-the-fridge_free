import { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { NavigateProp } from '../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from '../components/common/native-component';

import Container from '../components/common/Container';
import FridgeShape from '../components/common/FridgeShape';
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

  const deviceHeight = Dimensions.get('screen').height;
  const gap = deviceHeight < 700 ? 0 : deviceHeight < 1000 ? 4 : 8;

  return (
    <Container>
      <View style={tw`-mt-3 flex-1 gap-${gap} items-center w-full h-full`}>
        <View style={tw`w-full mt-3`}>
          <TextInput
            editable={false}
            style={tw`h-10 pl-8 w-full bg-white border-slate-600`}
            placeholder='냉장고에 찾는 식료품이 있는지 검색해보세요.'
            onPressIn={() => setModalVisible(true)}
          />
          <View style={tw`absolute left-2.5 h-full justify-center`}>
            <Icon name='search' type='Ionicons' size={19} />
          </View>
        </View>

        <View style={tw`w-full flex-1 p-1`}>
          <FridgeShape />
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
