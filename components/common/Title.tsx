import { View } from 'react-native';
import { LIGHT_INDIGO } from '../../constant/colors';
import { Text } from '../native-component';
import { FontGmarketSansBold } from '../../constant/fonts';
import { scaleFont } from '../../util';
import Icon from '../native-component/Icon';
import tw from 'twrnc';

interface Props {
  title: string;
  iconName?: string;
}

export default function Title({ title, iconName }: Props) {
  return (
    <View style={tw`flex-row items-center gap-0.5`}>
      {iconName && (
        <Icon
          type='MaterialCommunityIcons'
          name={iconName}
          size={20}
          color={'#fff'}
        />
      )}
      <Text
        style={tw.style(`text-white text-[${scaleFont(18)}px]`, {
          ...FontGmarketSansBold,
        })}
      >
        {title}
      </Text>
    </View>
  );
}
