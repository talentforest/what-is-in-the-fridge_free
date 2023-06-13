import { useState } from 'react';
import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { cutLetter, scaleH } from '../../util';
import { useSelector } from '../../redux/hook';
import { ScrollView } from 'react-native-gesture-handler';
import { Food } from '../../constant/foods';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import Icon from '../native-component/Icon';
import RNModal from './common/Modal';
import tw from 'twrnc';
import SearchInput from '../screen-component/my-fridge/SearchInput';
import TextInputContainer from '../common/TextInputBox';
import TextInputBox from '../common/TextInputBox';

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
      <View style={tw`mt-2`}>
        <TextInputBox
          value={keyword}
          setValue={setKeyword}
          iconName='search1'
          placeholder='식료품의 이름을 작성해주세요.'
          onSubmitEditing={onSubmitEditing}
        />
        {!!keyword.length && !!getSearchedFoods(keyword).length && (
          <Text style={tw`pt-1 pb-2 mx-3 text-slate-600`}>
            냉장고 속 {getSearchedFoods(keyword).length}
            개의 식료품을 찾았습니다.
          </Text>
        )}
        <View
          style={tw`gap-2 border-b border-slate-400 mx-3 py-3.5 flex-row items-center`}
        >
          <Text style={tw`w-[35%] text-indigo-600`}>식료품</Text>
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
                ({ image, name, space, compartmentNum }) => (
                  <View
                    key={name}
                    style={tw`gap-2 border-b border-slate-300 mx-3 py-4 flex-row items-center bg-indigo`}
                  >
                    <Text style={tw`w-[35%] text-slate-700`}>
                      <Text fontSize={12}>
                        {image ? (
                          image
                        ) : (
                          <Icon
                            type='MaterialCommunityIcons'
                            name='food-outline'
                            size={14}
                          />
                        )}
                      </Text>{' '}
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
