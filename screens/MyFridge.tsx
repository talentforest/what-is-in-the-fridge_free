import { Text } from '../components/native-component';
import { Platform, StatusBar, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { INDIGO, ORANGE_RED } from '../constant/colors';
import tw from 'twrnc';
import Space from '../components/screen-component/entrance-fridge/Space';
import InnerContainer from '../components/screen-component/entrance-fridge/InnerContainer';
import DoorContainer from '../components/screen-component/entrance-fridge/DoorContainer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MyFridge() {
  const statusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

  return (
    <View
      style={tw`flex-1 px-4 pb-2 bg-neutral-50 pt-[${
        (statusBarHeight || 0) + 14
      }px]`}
    >
      <Text styletw='pb-2 text-lg text-slate-600'>나의 냉장고</Text>
      <View
        style={tw`justify-end items-center border border-slate-300 mt-5 rounded-3xl py-2 px-3 self-center bg-yellow-200`}
      >
        <Text styletw='text-indigo-600 text-xs'>
          아래 냉장고에서 각각의 공간으로 들어갈 수 있어요.
        </Text>
      </View>
      <View style={tw`mt-4 flex-row gap-3 items-center justify-center`}>
        <View style={tw`flex-row items-center gap-1`}>
          <Icon name='food' size={20} color={INDIGO} />
          <Text styletw='text-slate-600'>식료품 개수</Text>
        </View>
        <View style={tw`flex-row items-center gap-1`}>
          <Icon name='alert-octagram-outline' size={20} color={ORANGE_RED} />
          <Text styletw='text-slate-600'>유통기한 임박 식료품 개수</Text>
        </View>
      </View>
      <View
        style={tw.style('flex-1 justify-center items-center pr-4 pl-7 w-full')}
      >
        <View style={tw`h-4/5 flex-row items-start`}>
          <InnerContainer>
            <Space space='냉동실 안쪽' />
            <Space space='냉장실 안쪽' bottom />
          </InnerContainer>
          <DoorContainer>
            <Space space='냉동실 문쪽' door />
            <Space space='냉장실 문쪽' door bottom />
          </DoorContainer>
        </View>
      </View>
    </View>
  );
}
