import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { Food } from '../../constant/foods';
import { BoxColor } from '../../screen-component/home/EntranceBox';
import {
  DEEP_YELLOW,
  INDIGO,
  LIGHT_GRAY,
  ORANGE_RED,
} from '../../constant/colors';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

type Button = 'delete-favorite' | 'add-shopping-list' | 'delete';
interface Props {
  list: Food[];
  onAddPress?: () => void;
  onDeletePress: () => void;
  buttons: Button[];
  color: BoxColor;
}

export default function TableFooter({
  list,
  onAddPress,
  onDeletePress,
  buttons,
  color,
}: Props) {
  const textColor = !!list.length ? `text-${color}-700` : 'text-slate-500';

  return (
    <View style={tw`h-10 flex-row items-center justify-between pl-3 pr-1`}>
      <Text style={tw`text-sm ${textColor}`}>
        {list.length}개의 식료품 선택
      </Text>
      <View style={tw`flex-row items-center gap-2`}>
        {/* 장보기 목록 추가 버튼 */}
        {buttons.includes('add-shopping-list') && onAddPress && (
          <TouchableOpacity
            onPress={onAddPress}
            disabled={!list.length}
            style={tw`p-2`}
          >
            <Icon
              type='MaterialCommunityIcons'
              name='basket-plus'
              size={20}
              color={list.length ? INDIGO : LIGHT_GRAY}
            />
          </TouchableOpacity>
        )}

        {/* 자주먹는 식품 해제 버튼 */}
        {buttons.includes('delete-favorite') && (
          <TouchableOpacity
            onPress={onDeletePress}
            disabled={!list.length}
            style={tw`p-2`}
          >
            <Icon
              type='MaterialCommunityIcons'
              name='tag-minus'
              size={20}
              color={list.length ? DEEP_YELLOW : LIGHT_GRAY}
            />
          </TouchableOpacity>
        )}

        {/* 삭제 버튼 */}
        {buttons.includes('delete') && (
          <TouchableOpacity
            onPress={onDeletePress}
            disabled={!list.length}
            style={tw`p-2.5`}
          >
            <Icon
              type='MaterialCommunityIcons'
              name='trash-can'
              size={20}
              color={list.length ? ORANGE_RED : LIGHT_GRAY}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
