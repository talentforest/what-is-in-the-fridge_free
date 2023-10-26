import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from '../common/native-component';
import { NavigateProp } from '../../navigation/Navigation';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

export default function ShowMoreBtnBox({ width }: { width: number }) {
  const navigation = useNavigation<NavigateProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('FavoriteFoods')}
      style={tw`w-[${width}px] h-28 justify-center items-center gap-1`}
    >
      <Icon
        name='arrow-right-circle-outline'
        type='MaterialCommunityIcons'
        size={30}
        color={'#888'}
      />
      <Text style={tw`text-xs text-slate-600`}>더보기</Text>
    </TouchableOpacity>
  );
}
