import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { Food } from '../../../constant/foods';
import { scaleH } from '../../../util';
import {
  DEEP_INDIGO,
  DEEP_YELLOW,
  LIGHT_GRAY,
  ORANGE_RED,
} from '../../../constant/colors';
import tw from 'twrnc';
import Icon from '../../native-component/Icon';

type Button = 'delete-favorite' | 'add-shopping-list' | 'delete';
interface Props {
  list: Food[];
  onAddPress?: () => void;
  onPress: () => void;
  buttons: Button[];
}

export default function TableFooter({
  list,
  onAddPress,
  onPress,
  buttons,
}: Props) {
  return (
    <View
      style={tw`h-[${scaleH(40)}px]
      flex-row items-center justify-between gap-2 px-2`}
    >
      <Text style={tw`${!!list.length ? 'text-indigo-500' : 'text-slate-500'}`}>
        {list.length}개의 식료품 선택
      </Text>
      <View style={tw`flex-row items-center gap-2`}>
        {/* 장보기 목록 추가 버튼 */}
        {buttons.includes('add-shopping-list') && onAddPress && (
          <TouchableOpacity
            onPress={onAddPress}
            disabled={!list.length}
            style={tw`p-1`}
          >
            <Icon
              type='MaterialCommunityIcons'
              name='basket-plus'
              size={22}
              color={list.length ? DEEP_INDIGO : LIGHT_GRAY}
            />
          </TouchableOpacity>
        )}

        {/* 자주먹는 식품 해제 버튼 */}
        {buttons.includes('delete-favorite') && (
          <TouchableOpacity
            onPress={onPress}
            disabled={!list.length}
            style={tw`p-1.5`}
          >
            <Icon
              type='MaterialCommunityIcons'
              name='tag-minus'
              size={22}
              color={list.length ? DEEP_YELLOW : LIGHT_GRAY}
            />
          </TouchableOpacity>
        )}

        {/* 삭제 버튼 */}
        {buttons.includes('delete') && (
          <TouchableOpacity
            onPress={onPress}
            disabled={!list.length}
            style={tw`p-1.5`}
          >
            <Icon
              type='MaterialCommunityIcons'
              name='trash-can'
              size={22}
              color={list.length ? ORANGE_RED : LIGHT_GRAY}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
