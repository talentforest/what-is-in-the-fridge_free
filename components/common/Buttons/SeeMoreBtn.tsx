import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from '../../native-component';
import { NavigateProp, RouteName } from '../../../navigation/Navigation';
import { FontGmarketSansBold } from '../../../constant/fonts';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

export default function SeeMoreBtn({ route }: { route: RouteName }) {
  const navigate = useNavigation<NavigateProp>();

  return (
    <TouchableOpacity
      onPress={() => navigate.navigate(route)}
      style={tw`flex-row items-center self-end`}
    >
      <Text fontSize={14} style={tw.style(`text-white`, FontGmarketSansBold)}>
        더보기
      </Text>
      <Icon
        name='chevron-right'
        type='MaterialCommunityIcons'
        color='#fff'
        size={20}
      />
    </TouchableOpacity>
  );
}