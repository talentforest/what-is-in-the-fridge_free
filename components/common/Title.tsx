import { View } from 'react-native';
import { Text } from '../native-component';
import { FontGmarketSansBold } from '../../constant/fonts';
import Icon from '../native-component/Icon';
import tw from 'twrnc';

interface Props {
  title: string;
  iconName?: string;
}

export default function Title({ title, iconName }: Props) {
  return (
    <View style={tw`flex-row items-center gap-1`}>
      {iconName && (
        <Icon
          type='MaterialCommunityIcons'
          name={iconName}
          size={20}
          color={'#fff'}
        />
      )}
      <Text fontSize={17} style={tw.style(`text-white`, FontGmarketSansBold)}>
        {title}
      </Text>
    </View>
  );
}
