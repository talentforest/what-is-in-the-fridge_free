import {
  Category,
  FoodCategory,
  foodCategories,
} from '../../constant/foodCategories';
import { LIGHT_GRAY } from '../../constant/colors';
import Icon from './native-component/Icon';
import IconMeatFishEgg from './native-component/IconMeatFishEgg';

interface Props {
  category: Category;
  size: number;
  inactive?: boolean;
}

export default function CategoryIcon({ category, size, inactive }: Props) {
  const findCategory = (category: Category) => {
    return foodCategories.find((item) => item.category === category);
  };

  const { icon, color } = findCategory(category) as FoodCategory;

  return (
    <>
      {icon === 'icon-meat-fish-egg.svg' ? (
        <IconMeatFishEgg size={size} />
      ) : (
        <Icon
          name={icon}
          size={size}
          type='MaterialCommunityIcons'
          color={inactive ? LIGHT_GRAY : color}
        />
      )}
    </>
  );
}
