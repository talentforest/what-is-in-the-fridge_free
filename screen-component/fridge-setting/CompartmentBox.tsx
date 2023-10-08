import { View } from 'react-native';
import { CompartmentNum, Space } from '../../constant/fridgeInfo';
import { shadowStyle } from '../../constant/shadowStyle';
import tw from 'twrnc';

interface Props {
  space: Space;
  compartmentNum: CompartmentNum;
  showInfo?: boolean;
}

export default function CompartmentBox({ space, compartmentNum }: Props) {
  return (
    <View
      key={compartmentNum}
      style={tw`flex-1 w-full mx-auto rounded-[4px] justify-end border border-slate-300 bg-white`}
    >
      {space.includes('문쪽') && (
        <View
          style={tw.style(
            `w-full absolute left-0 bottom-0 border border-slate-300 h-[60%] max-h-7 rounded-b-[3px] bg-slate-200`,
            shadowStyle(8)
          )}
        />
      )}
    </View>
  );
}
