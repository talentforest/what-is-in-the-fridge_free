import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from '../../native-component';
import { NavigateProp } from '../../../navigation/Navigation';
import { Space } from '../../../constant/fridge';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  space: Space;
  index: number;
}

export const AddFoodBtn = ({ space, index }: Props) => {
  const navigation = useNavigation<NavigateProp>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('AddFoodDrawer', {
          space,
          compartmentNum: `${index + 1}번`,
        });
      }}
    >
      <Icon name='basket-plus-outline' size={20} color='#4e45ff' />
    </TouchableOpacity>
  );
};
