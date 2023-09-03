import { Platform, View } from 'react-native';
import { CompartmentNum, Space } from '../../constant/fridgeInfo';
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
      style={tw`flex-1 w-full mx-auto rounded-[4px] justify-end border border-slate-400 bg-white`}
    >
      {space.includes('문쪽') && (
        <View
          style={tw.style(
            `w-full absolute left-0 bottom-0 shadow-md border border-slate-300 h-[60%] max-h-7 rounded-b-[3px] bg-slate-200`,
            Platform.select({
              ios: {
                shadowColor: '#bebebe',
                shadowOffset: { height: -2, width: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
              },
              android: {
                elevation: 8,
              },
            })
          )}
        />
      )}
    </View>
  );
}
