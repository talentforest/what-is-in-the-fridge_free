import { View } from 'react-native';
import { findMatchNameFoods } from '../../../util';
import { Text, TextInput, TouchableOpacity } from '../../native-component';
import { ModalTitle } from '../modal/Modal';
import { BLUE } from '../../../constant/colors';

import useFavoriteFoods from '../../../hooks/useFavoriteFoods';

import Icon from '../../native-component/Icon';
import FormLabel from './FormLabel';
import Message from './Message';
import tw from 'twrnc';

interface Props {
  title: ModalTitle;
  name: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
  editable: boolean;
}

export default function NameItem({ name, changeInfo, editable, title }: Props) {
  const { favoriteFoods, findFavoriteListItem } = useFavoriteFoods();

  const onChangeText = (value: string) => changeInfo({ name: value });

  const matchedFoods = findMatchNameFoods(favoriteFoods, name);

  const editableStyle = !editable
    ? 'border-slate-400 bg-slate-200 text-slate-600'
    : 'bg-white border-blue-600';

  return (
    <View>
      <FormLabel label='식료품 이름' />
      <View style={tw`flex-row gap-1`}>
        <View
          style={tw`${editableStyle} border flex-1 flex-row items-center rounded-lg h-12`}
        >
          <TextInput
            style={tw`${editableStyle} border-0 m-0.5 py-0.5 flex-1 rounded-lg`}
            editable={editable}
            onChangeText={onChangeText}
            value={name}
            placeholder={`식료품 이름을 작성해주세요`}
            focusable={false}
            pointerEvents={editable ? 'auto' : 'none'}
          />
        </View>
      </View>
      {title === '식료품 정보 수정' && !editable && (
        <Message message='식료품 이름은 수정할 수 없어요.' color='orange' />
      )}
      {title !== '식료품 정보 수정' && findFavoriteListItem(name) && (
        <Message
          message='자주 먹는 식료품이므로 아래 정보가 자동으로 적용돼요.'
          color='green'
        />
      )}

      {/* 자주 먹는 식료품 태그 목록 */}
      {!findFavoriteListItem(name) && editable && !!matchedFoods?.length && (
        <View style={tw`flex-row flex-wrap items-center mt-1 gap-1`}>
          {matchedFoods.slice(0, 4).map((food) => (
            <TouchableOpacity
              key={food.id}
              style={tw`max-w-full border border-blue-400 flex-row items-center bg-amber-200 px-2 py-1 gap-1 rounded-full`}
              onPress={() => changeInfo({ name: food.name })}
            >
              <Icon
                name={food.name === name ? 'check' : 'plus'}
                type='MaterialCommunityIcons'
                size={14}
                color={BLUE}
              />
              <Text style={tw`text-blue-600 max-w-[96%]`}>{food.name}</Text>
            </TouchableOpacity>
          ))}
          {matchedFoods.length > 3 && (
            <Text style={tw`ml-2 text-blue-600`}>
              ...+{matchedFoods.slice(3).length}개
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
