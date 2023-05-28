import { Image, View } from 'react-native';
import { Text } from '../../native-component';
import { useSelector } from '../../../redux/hook';
import { Asset } from 'expo-asset';
import useExpiredFood from '../../../hooks/useExpiredFoods';
import tw from 'twrnc';

export default function FridgeInfo({ asset }: { asset: Asset[] }) {
  const { fridgeFoods, freezerFoods } = useSelector((state) => state.allFoods);
  const { allExpiredFoods } = useExpiredFood();

  return (
    <View style={tw`mb-2 mt-8 gap-2`}>
      <View style={tw`flex-row items-center gap-2`}>
        <Text styletw='text-indigo-700'>나의 냉장고 요약</Text>
        <View style={tw`border h-0.5 flex-1 border-indigo-400`} />
      </View>
      <View
        style={tw`border rounded-lg bg-white border-slate-300 flex-row items-center justify-center py-2 gap-4 px-5`}
      >
        <Image source={asset[1]} style={tw`w-20 h-20`} />
        <View style={tw` items-start justify-between gap-3`}>
          <Text styletw='text-center text-gray-700'>나의 냉장고 속 식료품</Text>
          <Text styletw='text-center pt-2 text-indigo-600 text-xl self-end'>
            <Text styletw='text-xs text-slate-600 pt-5'>TOTAL</Text>{' '}
            {fridgeFoods.length + freezerFoods.length}개
          </Text>
        </View>
      </View>
      <View
        style={tw`bg-white border border-slate-300 rounded-lg flex-row items-center justify-center gap-4 py-2 px-5`}
      >
        <View style={tw`items-start justify-between gap-3`}>
          <Text styletw='text-center text-gray-700'>유통기한 임박 식료품</Text>
          <Text styletw='text-center pt-2 text-indigo-600 text-xl '>
            <Text styletw='text-xs text-slate-600 pt-5'>TOTAL</Text>{' '}
            {allExpiredFoods.length}개
          </Text>
        </View>
        <Image source={asset[0]} style={tw`w-20 h-20`} />
      </View>
    </View>
  );
}
