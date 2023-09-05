import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { FontGmarketSansBold } from '../../constant/fonts';
import { GRAY } from '../../constant/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp, RootStackParamList } from '../../navigation/Navigation';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';
import { RootTabParamList } from '../../navigation/MyTabs';

interface Props {
  title: string;
  screen: keyof RootTabParamList | keyof RootStackParamList;
}

export default function HeaderTitle({ title, screen }: Props) {
  const navigation = useNavigation<NavigateProp>();

  return (
    <View>
      <View style={tw`flex-row justify-between`}>
        <Text style={tw.style(`text-lg text-slate-700`, FontGmarketSansBold)}>
          {title}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(screen)}
          style={tw`flex-row items-center`}
        >
          <Text style={tw.style(`text-slate-600 text-[13px]`)}>더보기</Text>
          <Icon
            name='chevron-right'
            type='MaterialCommunityIcons'
            color={GRAY}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
