import { View } from 'react-native';
import { CompartmentNum, Space } from '../../../constant/fridgeInfo';
import { useRoute } from '@react-navigation/native';
import tw from 'twrnc';

interface Props {
  space: Space;
  compartmentNum: CompartmentNum;
  showInfo?: boolean;
}

export default function CompartmentBox({ space, compartmentNum }: Props) {
  const route = useRoute();

  return (
    <View
      key={compartmentNum}
      style={tw`flex-1 w-full mx-auto rounded-[5px] justify-end border border-slate-400 bg-white`}
    >
      {space.includes('문쪽') && route.name === 'MyFridge' && (
        <View
          style={tw`w-full absolute left-0 h-[60%] rounded-b-md border border-slate-400 bg-slate-200`}
        />
      )}
    </View>
  );
}
