import { useState } from 'react';
import { Animated, Keyboard, View } from 'react-native';
import { cutLetter, findMatchNameFoods } from '../../util';
import { Text, TextInput, TouchableOpacity } from '../common/native-component';
import { useGetFoodList, useFindFood, useSlideAnimation } from '../../hooks';

import Icon from '../common/native-component/Icon';
import FormLabel from './FormLabel';
import FormMessage from './FormMessage';
import tw from 'twrnc';

interface Props {
  name: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
  editable: boolean;
}

const FAV_ITEM_MAX = 3;
const NAME_MAX_LENGTH = 40;

export default function NameItem({ name, changeInfo, editable }: Props) {
  const [showMsg, setShowMsg] = useState(false);

  const { favoriteFoods } = useGetFoodList();
  const { isFavoriteItem } = useFindFood();

  const onChangeText = (value: string) => {
    if (value.length > NAME_MAX_LENGTH) {
      return setShowMsg(true);
    } else {
      setShowMsg(false);
    }
    changeInfo({ name: value });
  };

  const matchedFoods = findMatchNameFoods(favoriteFoods, name);
  const atLeastOneLongWord = matchedFoods?.find((food) => food.name.length > 8);
  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: atLeastOneLongWord && (matchedFoods || []).length >= 3 ? 80 : 46,
    active: !!matchedFoods?.length,
  });

  return (
    <View>
      <FormLabel label='식료품 이름' />

      <View
        style={tw`bg-white border-slate-300 h-11 shadow-md border flex-row items-center rounded-lg`}
      >
        <TextInput
          style={tw`${
            !editable ? 'text-slate-400' : ''
          } border-0 m-0.5 flex-1 rounded-lg`}
          editable={editable}
          onPressOut={() => {
            if (!editable) {
              setShowMsg(true);
            }
          }}
          onChangeText={onChangeText}
          value={name}
          placeholder={`식료품 이름을 작성해주세요`}
          focusable={false}
        />
      </View>

      {showMsg && (
        <FormMessage
          message={
            name.length === NAME_MAX_LENGTH
              ? `식료품 이름은 ${NAME_MAX_LENGTH}자를 넘을 수 없습니다.`
              : '식료품 이름은 수정할 수 없어요.'
          }
          color='orange'
        />
      )}

      {/* 자주 먹는 식료품 태그 목록 */}
      {!isFavoriteItem(name) && editable && (
        <Animated.View
          style={{
            height: height,
            overflow: 'hidden',
            marginBottom: !!matchedFoods?.length ? -15 : 0,
          }}
        >
          {!!matchedFoods?.length && (
            <View
              style={tw.style(
                `flex-row flex-wrap items-center mt-2 gap-1 px-0.5`
              )}
            >
              {matchedFoods.slice(0, FAV_ITEM_MAX).map((food) => (
                <TouchableOpacity
                  key={food.id}
                  style={tw`max-w-full h-7.5 shadow-md border border-blue-200 flex-row items-center bg-blue-100 px-2 gap-1 rounded-full`}
                  onPress={() => {
                    changeInfo({ name: food.name });
                    Keyboard.dismiss();
                  }}
                >
                  <Icon
                    name={food.name === name ? 'check' : 'plus'}
                    type='MaterialCommunityIcons'
                    size={16}
                  />
                  <Text style={tw`text-blue-700 text-[13px]`}>
                    {cutLetter(food.name, 8)}
                  </Text>
                </TouchableOpacity>
              ))}
              {matchedFoods.length > FAV_ITEM_MAX && (
                <Text style={tw`ml-2 text-blue-600 text-[14px]`}>
                  +{matchedFoods.length - FAV_ITEM_MAX}개
                </Text>
              )}
            </View>
          )}
        </Animated.View>
      )}
    </View>
  );
}
