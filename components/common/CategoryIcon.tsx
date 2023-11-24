import {
  Category,
  CategoryInfo,
  foodCategories,
} from '../../constant/foodCategories';
import { BLUE, LIGHT_GRAY } from '../../constant/colors';
import Icon from './native-component/Icon';
import IconMeatFishEgg from '../svg/category/IconMeatFishEgg';
import IconDairyEgg from '../svg/category/IconDairyEgg';
import IconCan from '../svg/category/IconCan';
import IconPeanutGrain from '../svg/category/IconPeanutGrain';
import IconLeaf from '../svg/category/IconLeaf';
import IconInstantBox from '../svg/category/IconInstantBox';
import IconNoodles from '../svg/category/IconNoodles';
import IconSideDish from '../svg/category/IconSideDish';
import IconGlassCupFill from '../svg/category/IconGlassCupFill';
import IconWineFill from '../svg/category/IconWineFill';

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

  const { icon, color } = findCategory(category) as CategoryInfo;

  return (
    <>
      {icon === 'sauce' ? (
        <IconWineFill size={size} color={inActive ? LIGHT_GRAY : color} />
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
