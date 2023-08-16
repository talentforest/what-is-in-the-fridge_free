import { useEffect } from 'react';
import { View } from 'react-native';
import { NavigateProp } from '../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';
import FridgeShape from '../components/common/FridgeShape';
import SearchFoodModal from '../components/screen-component/modal/SearchFoodModal';
import HeaderBtn from '../components/common/buttons/HeaderBtn';
import Container from '../components/common/layout/Container';
import tw from 'twrnc';
import useToggleModal from '../hooks/useToggleModal';

export default function MyFridge() {
  const navigation = useNavigation<NavigateProp>();
  const { modalVisible, setModalVisible } = useToggleModal();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={tw`flex-row pr-1.5`}>
          <HeaderBtn
            iconName={'search'}
            onPress={() => setModalVisible((prev) => !prev)}
          />
          <HeaderBtn
            iconName={'settings'}
            onPress={() => navigation.navigate('FridgeSetting')}
          />
        </View>
      ),
    });
  }, []);

  return (
    <Container>
      <View style={tw`w-[95%] h-[90%] max-h-[700px] m-auto`}>
        <FridgeShape />
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
