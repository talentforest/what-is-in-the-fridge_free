import { Image, ImageSourcePropType } from 'react-native';
import { Category, foodCategories } from '../../constant/foodCategories';
import { Asset } from 'expo-asset';
import { GRAY } from '../../constant/colors';
import Icon from '../native-component/Icon';

interface Props {
  kind: 'icon' | 'image';
  category: Category;
  size: number;
  assets?: Asset[];
  color?: string;
}

export default function CategoryImageIcon({
  kind,
  category,
  size,
  assets,
  color,
}: Props) {
  const findCategory = (category: Category) => {
    return foodCategories.find((item) => item.category === category);
  };

  const getAsset = (category: Category) => {
    const imageName = findCategory(category)?.image;
    return assets?.find(({ name }) => `${name}.png` === imageName);
  };

  return (
    <>
      {kind === 'icon' && (
        <Icon
          name={findCategory(category)?.icon || ''}
          size={size}
          type='MaterialCommunityIcons'
          color={color || GRAY}
        />
      )}

      {kind === 'image' && (
        <Image
          source={getAsset(category) as ImageSourcePropType}
          style={{ width: size, height: size }}
        />
      )}
    </>
  );
}
