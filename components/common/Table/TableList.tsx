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
    />
  );
}
