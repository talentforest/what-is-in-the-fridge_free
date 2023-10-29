import {
  Category,
  FoodCategory,
  foodCategories,
} from '../../constant/foodCategories';
import { LIGHT_GRAY } from '../../constant/colors';
import Icon from './native-component/Icon';
import IconMeatFishEgg from './native-component/IconMeatFishEgg';
import IconDairyEgg from './native-component/IconDairyEgg';
import IconSauce from './native-component/IconSauce';
import IconPizza from './native-component/IconPizza';

interface Props {
  category: Category;
  size: number;
  inactive?: boolean;
}

export default function CategoryIcon({ category, size, inactive }: Props) {
  const findCategory = (category: Category) => {
    const categoryName = foodCategories.find(
      (item) => item.category === category
    );
    return categoryName || '신선식품류';
  };

  const { icon, color } = findCategory(category) as FoodCategory;

  return (
    <>
      {icon === 'icon-meat-fish' ? (
        <IconMeatFishEgg size={size} />
      ) : icon === 'dairy-egg' ? (
        <IconDairyEgg size={size} />
      ) : icon === 'category-sauce' ? (
        <IconSauce size={size} />
      ) : icon === 'category-instant' ? (
        <IconPizza size={size} />
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
