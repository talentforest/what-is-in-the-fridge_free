import { FlatList, ListRenderItem, View } from 'react-native';
import { Food } from '../../../constant/foods';
import tw from 'twrnc';

interface Props {
  list: Food[];
  renderItem: ListRenderItem<Food> | null | undefined;
}

export default function TableList({ list, renderItem }: Props) {
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      data={list}
      renderItem={renderItem}
      style={tw`flex-1 bg-stone-100 border-t-2 border-b-2 border-slate-300`}
      contentContainerStyle={tw`px-3 pb-3`}
      ItemSeparatorComponent={() => (
        <View style={tw`border-t border-slate-300`} />
      )}
    />
  );
}
