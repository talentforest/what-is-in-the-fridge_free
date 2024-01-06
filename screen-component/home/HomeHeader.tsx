import { View, useWindowDimensions } from 'react-native';
import { Text } from '../../components/common/native-component';
import { MEDIUM_INDIGO } from '../../constant/colors';
import { ReactNode } from 'react';

import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

export type HomeScreenTitle = '냉장고에 뭐가 있지' | '장볼게 뭐가 있지';

interface Props {
  title: HomeScreenTitle;
  children?: ReactNode;
}

export default function HomeHeader({ title, children }: Props) {
  const { height } = useWindowDimensions();

  const fontSize = height > 900 ? 23 : 20;

  return (
    <View style={tw`mt-1`}>
      <View
        style={tw`flex-row h-11 justify-between items-center gap-0.5 -mr-0.5 ml-1`}
      >
        <View style={tw`flex-row items-center gap-1`}>
          {title === '냉장고에 뭐가 있지' ? (
            <Icon name='home' type='Octicons' size={16} color={MEDIUM_INDIGO} />
          ) : title === '장볼게 뭐가 있지' ? (
            <Icon
              name='cart-outline'
              type='MaterialCommunityIcons'
              size={18}
              color={MEDIUM_INDIGO}
            />
          ) : null}

          <Text fontSize={fontSize} style={tw`ml-0.5`}>
            {title}
          </Text>
        </View>

        {children}
      </View>
    </View>
  );
}
