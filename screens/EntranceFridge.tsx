import { View } from 'react-native';
import FridgeInfo from '../components/screen-component/entrance-fridge/FridgeInfo';
import Space from '../components/screen-component/entrance-fridge/Space';
import tw from 'twrnc';

export default function EntranceFridge() {
  return (
    <View style={tw`flex-1 px-4 pt-2 pb-12`}>
      <FridgeInfo />
      <View style={tw`flex-1 flex-row gap-1 items-start`}>
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
