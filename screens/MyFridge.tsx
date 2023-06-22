import { useState } from 'react';
import { Text } from '../components/native-component';
import { Platform, StatusBar, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import FridgeShape from '../components/common/FridgeShape';
import Header from '../components/common/Header';
import SearchFoodModal from '../components/modal/SearchFoodModal';
import tw from 'twrnc';

export default function MyFridge() {
  const [modalVisible, setModalVisible] = useState(false);
  const statusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

  return (
    <>
      <View
        style={tw`flex-1 px-4 pb-2 bg-neutral-50 pt-[${
          (statusBarHeight || 0) + 14
        }px]`}
      >
        <Header
          title='나의 냉장고'
          iconName='search'
          onPress={() => setModalVisible((prev) => !prev)}
        />

        <View style={tw`flex-1 justify-center items-center gap-5`}>
          <View
            style={tw`border border-slate-300 rounded-full py-2 px-3 bg-yellow-200`}
          >
            <Text style={tw`text-indigo-600`} fontSize={12}>
              아래 냉장고에서 각각의 공간으로 들어갈 수 있어요.
            </Text>
          </View>
          <View style={tw`h-[85%] max-h-[700px] w-[90%]`}>
            <FridgeShape showInfo />
          </View>
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
