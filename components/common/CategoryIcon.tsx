import {
  Category,
  FoodCategory,
  foodCategories,
} from '../../constant/foodCategories';
import { BLUE, LIGHT_GRAY } from '../../constant/colors';
import Icon from './native-component/Icon';
import IconMeatFishEgg from '../svg/foodCategory/IconMeatFishEgg';
import IconDairyEgg from '../svg/foodCategory/IconDairyEgg';
import IconCan from '../svg/foodCategory/IconCan';
import IconPeanutGrain from '../svg/foodCategory/IconPeanutGrain';
import IconLeaf from '../svg/foodCategory/IconLeaf';
import IconInstantBox from '../svg/foodCategory/IconInstantBox';
import IconNoodles from '../svg/foodCategory/IconNoodles';
import IconSideDish from '../svg/foodCategory/IconSideDish';
import IconGlassCupFill from '../svg/foodCategory/IconGlassCupFill';
import IconIceCream2Fill from '../svg/foodCategory/IconIceCream2Fill';
import IconWineFill from '../svg/foodCategory/IconWineFill';

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
      {icon === 'sauce' ? (
        <IconWineFill size={size} color={inActive ? LIGHT_GRAY : color} />
      ) : icon === 'dessert' ? (
        <IconIceCream2Fill size={size} color={inActive ? LIGHT_GRAY : color} />
      ) : icon === 'cup-water' ? (
        <IconGlassCupFill size={size} color={inActive ? LIGHT_GRAY : BLUE} />
      ) : icon === 'sidedish' ? (
        <IconSideDish size={size} inActive={inActive} />
      ) : icon === 'noodles' ? (
        <IconNoodles size={size} inActive={inActive} />
      ) : icon === 'instant-box' ? (
        <IconInstantBox size={size} inActive={inActive} />
      ) : icon === 'leaf' ? (
        <IconLeaf size={size} inActive={inActive} />
      ) : icon === 'peanut-grain' ? (
        <IconPeanutGrain size={size} inActive={inActive} />
      ) : icon === 'can' ? (
        <IconCan size={size} inActive={inActive} />
      ) : icon === 'icon-meat-fish' ? (
        <IconMeatFishEgg size={size} inActive={inActive} />
      ) : icon === 'dairy-egg' ? (
        <IconDairyEgg size={size} inActive={inActive} />
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
