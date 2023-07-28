import { useState } from 'react';
import { View } from 'react-native';
import { Text } from '../../native-component';
import { scaleH } from '../../../util';
import { useSelector } from '../../../redux/hook';
import { ScrollView } from 'react-native-gesture-handler';
import { Food } from '../../../constant/foods';
import TextInputRoundedBox from '../../common/boxes/TextInputRoundedBox';
import RNModal from '../../common/modal/Modal';
import SearchedItem from '../../common/table/SearchedItem';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function SearchFoodModal({
  modalVisible,
  setModalVisible,
}: Props) {
  const [keyword, setKeyword] = useState('');
  const { allFoods } = useSelector((state) => state.allFoods);

  const getSearchedFoods = (char: string) => {
    return allFoods.filter((food) =>
      food.name
        .replaceAll(' ', '') //
        .includes(char)
    );
  };

  const onSubmitEditing = () => {
    if (keyword === '') return;
    setKeyword(keyword);
  };

  return (
    <RNModal
      title='나의 식료품 찾기'
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    >
      <View>
        <TextInputRoundedBox
          value={keyword}
          setValue={setKeyword}
          iconName='search1'
          placeholder='식료품의 이름을 작성해주세요.'
          onSubmitEditing={onSubmitEditing}
        />

        {/* 식료품 찾기 테이블 헤더 */}
        <View
          style={tw`gap-2 border-b border-slate-400 mt-1 mx-3 py-3.5 flex-row items-center`}
        >
          <Text style={tw`w-[35%] text-indigo-600`}>
            식료품 | {!!keyword.length ? getSearchedFoods(keyword).length : 0}개
          </Text>
          <Text style={tw`flex-1 text-indigo-600`}>위치</Text>
          <Text style={tw`text-indigo-600`}>이동</Text>
        </View>

        {/* 식료품 테이블 리스트 */}
        <ScrollView
          style={tw`h-[${scaleH(80)}]`}
          showsVerticalScrollIndicator={false}
        >
          {!!keyword.length &&
            (getSearchedFoods(keyword).length ? (
              getSearchedFoods(keyword).map((food: Food) => (
                <SearchedItem
                  key={food.id}
                  food={food}
                  setModalVisible={setModalVisible}
                />
              ))
            ) : (
              <Text style={tw`text-slate-500 text-center pt-20`}>
                해당 식료품은 냉장고에 없습니다.
              </Text>
            ))}
          {keyword.length === 0 && (
            <Text style={tw`text-slate-500 text-center pt-20`}>
              냉장고에 찾으시는 식료품이 있는지 확인해 보세요.
            </Text>
          )}
        </ScrollView>
      </View>
    </RNModal>
  );
}
