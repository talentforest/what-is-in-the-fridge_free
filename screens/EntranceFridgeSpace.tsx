import { Text } from '../components/native-component';
import { View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Space from '../components/screen-component/entrance-fridge/Space';
import tw from 'twrnc';

export default function EntranceFridgeSpace() {
  const statusBarHeight = getStatusBarHeight(true);

  return (
    <View
      style={tw`flex-1 px-4 pb-2 bg-neutral-50 pt-[${statusBarHeight + 14}px]`}
    >
      <Text styletw='pb-2 text-lg text-slate-600'>나의 냉장고</Text>
      <View
        style={tw`flex-1 flex-row gap-1 items-start border border-stone-400 p-2 rounded-lg bg-stone-300`}
      >
        <View style={tw`flex-1 justify-center items-center rounded-2xl`}>
          <Space space='냉동실 안쪽' />
          <Space space='냉장실 안쪽' bottom />
        </View>
        <View style={tw`flex-1 justify-center items-center rounded-2xl`}>
          <Space space='냉동실 문쪽' door />
          <Space space='냉장실 문쪽' door bottom />
        </View>
      </View>
    </View>
  );
}
