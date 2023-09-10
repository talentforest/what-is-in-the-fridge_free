import { useState } from 'react';
import { Animated, View } from 'react-native';
import { cutLetter, findMatchNameFoods } from '../../util';
import { Text, TextInput, TouchableOpacity } from '../common/native-component';
import { BLUE } from '../../constant/colors';
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

export default function NameItem({ name, changeInfo, editable }: Props) {
  const [showMsg, setShowMsg] = useState(false);
  const { favoriteFoods } = useGetFoodList();
  const { findFavoriteListItem } = useFindFood();

  const onChangeText = (value: string) => changeInfo({ name: value });

  const matchedFoods = findMatchNameFoods(favoriteFoods, name);
  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: 31,
    active: !!matchedFoods?.length,
  });

  const editableStyle = !editable
    ? 'border-slate-400 bg-slate-200 text-slate-600'
    : 'bg-white border-blue-300';

  return (
    <View>
      <FormLabel label='식료품 이름' />
      <View style={tw`flex-row gap-1`}>
        <View
          style={tw`${editableStyle} border flex-1 flex-row items-center rounded-lg h-12`}
        >
          <TextInput
            style={tw`${editableStyle} border-0 m-0.5 flex-1 rounded-lg`}
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
      </View>

      {showMsg && (
        <FormMessage message='식료품 이름은 수정할 수 없어요.' color='orange' />
      )}

      {/* 자주 먹는 식료품 태그 목록 */}
      {!findFavoriteListItem(name) && editable && (
        <Animated.View
          style={{
            height: height,
            overflow: 'hidden',
          }}
        >
          {!!matchedFoods?.length && (
            <View
              style={tw.style(`flex-row flex-wrap items-center mt-1 gap-1`)}
            >
              {matchedFoods.slice(0, 2).map((food) => (
                <TouchableOpacity
                  key={food.id}
                  style={tw`max-w-full h-6.5 border border-blue-400 flex-row items-center bg-amber-200 px-2 gap-1 rounded-full`}
                  onPress={() => changeInfo({ name: food.name })}
                >
                  <Icon
                    name={food.name === name ? 'check' : 'plus'}
                    type='MaterialCommunityIcons'
                    size={14}
                    color={BLUE}
                  />
                  <Text style={tw`text-blue-600 max-w-[96%] text-xs`}>
                    {cutLetter(food.name, 8)}
                  </Text>
                </TouchableOpacity>
              ))}
              {matchedFoods.length > 2 && (
                <Text style={tw`ml-2 text-blue-600 text-xs`}>
                  ...+{matchedFoods.length - 2}개
                </Text>
              )}
            </View>
          )}
        </Animated.View>
      )}
    </View>
  );
}
