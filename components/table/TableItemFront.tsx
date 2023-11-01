import { Food } from '../../constant/foodInfo';
import { useRouteName } from '../../hooks/useRouteName';
import CategoryIcon from '../common/CategoryIcon';

interface Props {
  food: Food;
}

export default function TableItemFront({ food }: Props) {
  const { routeShoppingList } = useRouteName();

  return (
    <>
      {!routeShoppingList && (
        <CategoryIcon size={15} category={food.category} />
      )}
    </>
  );
}
