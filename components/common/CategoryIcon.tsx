import {
  Category,
  FoodCategory,
  foodCategories,
} from '../../constant/foodCategories';
import { GRAY } from '../../constant/colors';
import Icon from './native-component/Icon';

interface Props {
  category: Category;
  size: number;
}

export default function CategoryIcon({ category, size }: Props) {
  const findCategory = (category: Category) => {
    return foodCategories.find((item) => item.category === category);
  };

  const { icon, color } = findCategory(category) as FoodCategory;

  return (
    <Icon
      name={icon}
      size={size}
      type={icon === 'pizza' ? 'Ionicons' : 'MaterialCommunityIcons'}
      color={color || GRAY}
    />
  );
}
