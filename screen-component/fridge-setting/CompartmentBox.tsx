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
  const borderRadius = 'rounded-[6px]';

  return (
    <View
      key={compartmentNum}
      style={tw`flex-1 w-full mx-auto ${borderRadius} justify-end border border-[#dadada] bg-white`}
    >
      {space.includes('문쪽') && (
        <View
          style={tw.style(
            `${borderRadius} rounded-t-sm w-full absolute left-0 bottom-0 h-[55%] max-h-7 bg-gray-100`,
            shadowStyle(2)
          )}
        />
      )}
    </View>
  );
}
