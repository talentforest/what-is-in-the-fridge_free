import { View } from 'react-native';
import { Text } from '../../native-component';
import { FontGmarketSansBold } from '../../../constant/fonts';
import { ScrollView } from 'react-native-gesture-handler';
import { foodCategories } from '../../../constant/foodCategories';
import RNModal from '../../common/modal/Modal';
import CheckBoxItem from '../../common/form/CheckBoxItem';
import useFavoriteFoods from '../../../hooks/useFavoriteFoods';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  title: '카테고리 선택' | '자주 먹는 식료품에서 선택';
  currentChecked: string;
  onCheckBoxPress: (name: string) => void;
}

export default function FormItemDetailModal({
  modalVisible,
  setModalVisible,
  title,
  currentChecked,
  onCheckBoxPress,
}: Props) {
  const { favoriteFoods } = useFavoriteFoods();
  const sortedAllFavFoods = favoriteFoods.map((food) => food.name).sort();
  return (
    <RNModal
      bgColor='bg-white'
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      style={tw`justify-center mx-4`}
      animationIn='fadeIn'
      animationOut='fadeOut'
    >
      <View style={tw`mt-3 p-2`}>
        <Text style={tw.style('text-indigo-500', FontGmarketSansBold)}>
          {title}
        </Text>
        {title === '자주 먹는 식료품에서 선택' && (
          <Text style={tw`text-slate-500 mt-3`} fontSize={12}>
            - 가나다 순
          </Text>
        )}
        <ScrollView
          style={tw`max-h-100 mt-3`}
          contentContainerStyle={tw`gap-4.5 py-2`}
        >
          {title === '자주 먹는 식료품에서 선택' &&
            sortedAllFavFoods.map((name: string) => (
              <CheckBoxItem
                key={name}
                onPress={() => onCheckBoxPress(name)}
                checked={name === currentChecked}
                title={name}
              />
            ))}
          {title === '카테고리 선택' &&
            foodCategories.map(({ category }) => (
              <CheckBoxItem
                key={category}
                onPress={() => onCheckBoxPress(category)}
                checked={category === currentChecked}
                title={category}
              />
            ))}
        </ScrollView>
      </View>
    </RNModal>
  );
}
