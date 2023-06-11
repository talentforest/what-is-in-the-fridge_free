import { Text } from '../components/native-component';
import { Platform, StatusBar, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { INDIGO, ORANGE_RED } from '../constant/colors';
import Icon from '../components/native-component/Icon';
import FridgeShape from '../components/common/FridgeShape';
import tw from 'twrnc';
import { scaleH } from '../util';

export default function MyFridge() {
  const statusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

  return (
    <View
      style={tw`flex-1 px-4 pb-2 bg-neutral-50 pt-[${
        (statusBarHeight || 0) + 14
      }px]`}
    >
      <Text style={tw`pb-2 text-slate-600`} fontSize={18}>
        나의 냉장고
      </Text>
      <View style={tw`flex-1 justify-center items-center gap-5`}>
        <View style={tw`justify-center items-center`}>
          <View
            style={tw`border border-slate-300 rounded-full py-2 px-3 bg-yellow-200`}
          >
            <Text style={tw`text-indigo-600`} fontSize={12}>
              아래 냉장고에서 각각의 공간으로 들어갈 수 있어요.
            </Text>
          </View>
          <View style={tw`mt-2 flex-row gap-3 items-center justify-center`}>
            <View style={tw`flex-row items-center gap-1`}>
              <Icon
                type='MaterialCommunityIcons'
                name='food-fork-drink'
                size={20}
                color={INDIGO}
              />
              <Text style={tw`text-slate-600`}>식료품 개수</Text>
            </View>
            <View style={tw`flex-row items-center gap-1`}>
              <Icon
                type='MaterialCommunityIcons'
                name='alert-octagram-outline'
                size={20}
                color={ORANGE_RED}
              />
              <Text style={tw`text-slate-600`}>유통기한 주의 식료품 개수</Text>
            </View>
          </View>
        </View>
        <View style={tw`h-[80%] max-h-[700px] w-[90%]`}>
          <FridgeShape showInfo />
        </View>
      </View>
    </View>
  );
}
