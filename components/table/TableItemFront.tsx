import { View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { useRouteName } from '../../hooks/useRouteName';

import CategoryIcon from '../common/CategoryIcon';
import tw from 'twrnc';

interface Props {
  food: Food;
}

export default function TableItemFront({ food }: Props) {
  const { routeHome } = useRouteName();

  return (
    <>
      {!routeHome && (
        <View style={tw`mr-0.5 flex-row items-center gap-2`}>
          <CategoryIcon size={15} category={food.category} />
        </View>
      )}
    </>
  );
}
