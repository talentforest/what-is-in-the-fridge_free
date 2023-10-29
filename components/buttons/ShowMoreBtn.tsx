import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from '../common/native-component';
import { NavigateProp, RootStackParamList } from '../../navigation/Navigation';
import { GRAY } from '../../constant/colors';
import { RootTabParamList } from '../../navigation/MyTabs';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  screen: keyof RootTabParamList | keyof RootStackParamList;
}

export default function ShowMoreBtn({ screen }: Props) {
  const navigation = useNavigation<NavigateProp>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screen)}
      style={tw`flex-row items-center`}
    >
      <Text style={tw.style(`text-slate-600 text-sm`)}>더보기</Text>
      <Icon
        name='chevron-right'
        type='MaterialCommunityIcons'
        color={GRAY}
        size={20}
      />
    </TouchableOpacity>
  );
}
