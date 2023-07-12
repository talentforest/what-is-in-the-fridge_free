import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FridgeShape from '../components/common/FridgeShape';
import SearchFoodModal from '../components/modal/SearchFoodModal';
import tw from 'twrnc';
import HeaderBtn from '../components/common/Buttons/HeaderBtn';
import { Text } from '../components/native-component';

export default function MyFridge() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderBtn
          iconName={'search'}
          onPress={() => setModalVisible((prev) => !prev)}
        />
      ),
    });
  }, []);

  return (
    <>
      <View style={tw`flex-1 px-4 bg-blue-100 justify-center items-center`}>
        <View style={tw`w-[95%] h-[90%] max-h-[700px]`}>
          <FridgeShape />
        </View>
      </View>
      {modalVisible && (
        <SearchFoodModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  );
}
