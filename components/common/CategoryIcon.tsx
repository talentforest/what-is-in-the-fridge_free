import {
  Category,
  FoodCategory,
  foodCategories,
} from '../../constant/foodCategories';
import { LIGHT_GRAY } from '../../constant/colors';
import Icon from './native-component/Icon';
import IconMeatFishEgg from '../svg/IconMeatFishEgg';
import IconDairyEgg from '../svg/IconDairyEgg';
import IconSauce from '../svg/IconSauce';
import IconPizza from '../svg/IconPizza';

interface Props {
  category: Category;
  size: number;
  inActive?: boolean;
}

export default function CategoryIcon({ category, size, inActive }: Props) {
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
        <IconMeatFishEgg size={size} inActive={inActive} />
      ) : icon === 'dairy-egg' ? (
        <IconDairyEgg size={size} inActive={inActive} />
      ) : icon === 'category-sauce' ? (
        <IconSauce size={size} inActive={inActive} />
      ) : icon === 'category-instant' ? (
        <IconPizza size={size} inActive={inActive} />
      ) : (
        <Icon
          name={icon}
          size={size}
          type='MaterialCommunityIcons'
          color={inActive ? LIGHT_GRAY : color}
        />
      )}
    </>
  );
}
