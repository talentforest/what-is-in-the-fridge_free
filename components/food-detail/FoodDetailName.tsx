import { View } from 'react-native';
import { Text } from '../common/native-component';
import { useFindFood } from '../../hooks';
import { INDIGO, LIGHT_GRAY } from '../../constant/colors';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

export default function FoodDetailName({ name }: { name: string }) {
  const { isFavoriteItem } = useFindFood();

  return (
    <View
      style={tw`gap-1.5 self-center flex-row justify-center items-center border-slate-300 mb-4 mt-2 py-1.5 px-2.5`}
    >
      <View
        style={tw`absolute top-0 left-0 border-t-2 border-l-2 rounded-tl-[3px] border-slate-400 w-4 h-3`}
      />
      <Icon
        type='MaterialCommunityIcons'
        name={!!isFavoriteItem(name) ? 'tag' : 'tag-outline'}
        size={16}
        color={!!isFavoriteItem(name) ? INDIGO : LIGHT_GRAY}
      />
      <Text
        fontSize={18}
        style={tw.style(`max-w-4/5 text-stone-800 leading-5`)}
      >
        {name}
      </Text>

      <View
        style={tw`absolute bottom-0 right-0 border-b-2 border-r-2 rounded-br-[3px] border-slate-400 w-4 h-3`}
      />
    </View>
  );
}
