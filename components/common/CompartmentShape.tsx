import { View } from 'react-native';
import { CompartmentNum, Space } from '../../constant/fridgeInfo';
import tw from 'twrnc';

interface Props {
  space: Space;
  compartmentNum: CompartmentNum;
  showInfo?: boolean;
}

export default function CompartmentShape({ space, compartmentNum }: Props) {
  return (
    <View
      key={compartmentNum}
      style={tw`flex-1 w-[92%] mx-auto rounded-[4px] justify-end border border-slate-300 bg-white`}
    >
      {space.includes('문쪽') && (
        <View
          style={tw`border w-full absolute left-0 h-[60%] rounded-b-[4px] border-slate-300 shadow-md  bg-slate-100`}
        />
      )}
    </View>
  );
}
