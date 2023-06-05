import { View } from 'react-native';
import { Text } from '../native-component';
import { CompartmentNum } from '../../constant/fridgeInfo';
import tw from 'twrnc';

export default function Compartment({
  compartmentNum,
}: {
  compartmentNum: CompartmentNum;
}) {
  return (
    <View
      style={tw`flex-1 rounded-md justify-end items-end border border-slate-300 p-1 bg-white`}
    >
      <Text styletw='text-[9px] text-slate-500'>{compartmentNum}칸</Text>
    </View>
  );
}
