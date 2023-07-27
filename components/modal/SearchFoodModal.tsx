import { useState } from 'react';
import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { cutLetter, scaleH } from '../../util';
import { useSelector } from '../../redux/hook';
import { ScrollView } from 'react-native-gesture-handler';
import { Food } from '../../constant/foods';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import TextInputBox from '../common/TextInputBox';
import Icon from '../native-component/Icon';
import RNModal from './common/Modal';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function SearchFoodModal({
  modalVisible,
  setModalVisible,
}: Props) {
  const navigation = useNavigation<NavigateProp>();
  const [keyword, setKeyword] = useState('');
  const { allFoods } = useSelector((state) => state.allFoods);

  const getSearchedFoods: (char: string) => Food[] = (char: string) => {
    return allFoods.filter((food) =>
      food.name.replaceAll(' ', '').includes(char)
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
        <TextInputBox
          value={keyword}
          setValue={setKeyword}
          iconName='search1'
          placeholder='식료품의 이름을 작성해주세요.'
          onSubmitEditing={onSubmitEditing}
        />

        <View
          style={tw`gap-2 border-b border-slate-400 mt-1 mx-3 py-3.5 flex-row items-center`}
        >
          <Text style={tw`w-[35%] text-indigo-600`}>
            식료품 / {!!keyword.length ? getSearchedFoods(keyword).length : 0}개
          </Text>
          <Text style={tw`flex-1 text-indigo-600`}>위치</Text>
          <Text style={tw`text-indigo-600`}>이동</Text>
        </View>
        <ScrollView
          style={tw`h-[${scaleH(80)}]`}
          showsVerticalScrollIndicator={false}
        >
          {!!keyword.length &&
            (getSearchedFoods(keyword).length ? (
              getSearchedFoods(keyword).map(
                ({ name, space, compartmentNum }) => (
                  <View
                    key={name}
                    style={tw`gap-2 border-b border-slate-300 mx-3 flex-row items-center bg-white`}
                  >
                    <Text style={tw`w-[35%] text-slate-700`}>
                      {cutLetter(name, 6)}
                    </Text>

                    <Text style={tw`flex-1 text-slate-500`}>
                      <Text
                        style={tw`${
                          space.includes('냉장실')
                            ? 'text-blue-600'
                            : 'text-green-600'
                        }`}
                      >
                        {space}
                      </Text>{' '}
                      {compartmentNum}칸
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Compartments', { space });
                        setModalVisible(false);
                      }}
                      style={tw`p-3 pr-1`}
                    >
                      <Icon
                        type='MaterialCommunityIcons'
                        name='arrow-top-right'
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                )
              )
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
