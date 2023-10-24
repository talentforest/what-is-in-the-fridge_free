import { useRoute } from '@react-navigation/native';
import { Food } from '../../constant/foodInfo';
import CategoryIcon from '../common/CategoryIcon';
import ExpiredExclamation from '../common/ExpiredExclamation';

interface Props {
  food: Food;
}

export default function TableItemFront({ food }: Props) {
  const route = useRoute();
  const routeExpiredFood = route.name === 'ExpiredFoods';
  const routeShoppingList = route.name === 'ShoppingList';

  return (
    <>
      {routeExpiredFood && (
        <ExpiredExclamation expiredDate={food.expiredDate} />
      )}

      {!routeShoppingList && (
        <CategoryIcon size={16} category={food.category} />
      )}
    </>
  );
}
