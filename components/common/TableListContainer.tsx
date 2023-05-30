import { ScrollView, View } from 'react-native';
import { ReactNode } from 'react';
import { Text, TouchableOpacity } from '../native-component';
import { DEEP_INDIGO, INACTIVE_COLOR } from '../../constant/colors';
import { useSelector } from '../../redux/hook';
import Icon from 'react-native-vector-icons/Feather';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
  onEntirePress: () => void;
  entireCheck: boolean;
}

export default function TableListContainer({
  children,
  onEntirePress,
  entireCheck,
}: Props) {
  const { shoppingList } = useSelector((state) => state.shoppingList);

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView
        style={tw`flex-1 bg-white mx-4`}
        contentContainerStyle={tw``}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      <View
        style={tw`flex-row items-center gap-2 mx-4 h-11 border-t border-slate-300`}
      >
        <View style={tw`w-5 h-5 justify-center`}>
          {!!shoppingList.length && (
            <TouchableOpacity
              onPress={onEntirePress}
              style={tw`w-5.5 h-5.5 justify-center`}
            >
              <Icon
                name={!entireCheck ? 'square' : 'check-square'}
                size={18}
                color={!entireCheck ? INACTIVE_COLOR : DEEP_INDIGO}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text styletw='text-indigo-500 flex-1'>
          장보기 목록 : 총 {shoppingList.length}개
        </Text>
      </View>
    </View>
  );
}
