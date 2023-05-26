import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import tw from 'twrnc';

interface Props {
  searchTab: boolean;
  setSearchTab: (searchTab: boolean) => void;
}

export default function TabBtn({ searchTab, setSearchTab }: Props) {
  return (
    <View style={tw`flex-row gap-0`}>
      <TouchableOpacity
        onPress={() => setSearchTab(true)}
        style={tw`border flex-1 items-center p-2 py-3 rounded-t-md border-slate-400 ${
          searchTab ? 'bg-white border-b-0' : 'bg-slate-200'
        }`}
      >
        <Text styletw={`${searchTab ? 'text-indigo-600' : 'text-slate-400'}`}>
          식품 가공품 정보 검색
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSearchTab(false)}
        style={tw`border flex-1 items-center p-2 py-3 rounded-t-md border-slate-400 ${
          !searchTab ? 'bg-white border-b-0' : 'bg-slate-200'
        }`}
      >
        <Text styletw={`${!searchTab ? 'text-indigo-600' : 'text-slate-400'}`}>
          식료품 정보 직접 입력
        </Text>
      </TouchableOpacity>
    </View>
  );
}
