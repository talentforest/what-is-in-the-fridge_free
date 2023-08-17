import { View } from 'react-native';
import { scaleH, findMatchNameFoods } from '../../../util';
import { Text, TextInput, TouchableOpacity } from '../../native-component';
import { INDIGO } from '../../../constant/colors';
import Icon from '../../native-component/Icon';
import useFavoriteFoods from '../../../hooks/useFavoriteFoods';
import useToggleModal from '../../../hooks/useToggleModal';
import FormItemDetailModal from '../../screen-component/modal/FormItemDetailModal';
import tw from 'twrnc';

interface Props {
  name: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
  editable: boolean;
}

export default function NameItem({ name, changeInfo, editable }: Props) {
  const { modalVisible, setModalVisible } = useToggleModal();
  const { favoriteFoods } = useFavoriteFoods();

  const onChangeText = (value: string) => changeInfo({ name: value });
  const editableStyle = !editable ? 'bg-slate-200 text-slate-900' : 'bg-white';

  const matchedFoods = findMatchNameFoods(favoriteFoods, name);

  const onCheckBoxPress = (name: string) => {
    changeInfo({ name });
    setModalVisible(false);
  };

  return (
    <>
      <View style={tw`flex-row gap-1`}>
        <View
          style={tw`border flex-1 border-indigo-500 flex-row items-center rounded-lg bg-white ${editableStyle}
          h-[${scaleH(44)}px]`}
        >
          <TextInput
            style={tw`border-0 m-0.5 py-0.5 flex-1 rounded-lg ${editableStyle}`}
            editable={editable}
            onChangeText={onChangeText}
            value={name}
            placeholder={`식료품 이름을 작성해주세요`}
            focusable={false}
            returnKeyType='next'
            returnKeyLabel='다음'
            pointerEvents={editable ? 'auto' : 'none'}
          />
        </View>
        {editable && (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={tw`border border-indigo-500 bg-indigo-500 justify-center py-2 px-2.5 rounded-lg`}
          >
            <Icon
              name='tag-heart'
              type='MaterialCommunityIcons'
              size={22}
              color='#fff'
            />
          </TouchableOpacity>
        )}
      </View>

      {/* 자주 먹는 식료품 목록 모달 버튼 */}
      {editable && !!matchedFoods?.length && (
        <View style={tw`flex-row flex-wrap items-center mt-1 gap-1`}>
          {matchedFoods.slice(0, 4).map((food) => (
            <TouchableOpacity
              key={food.id}
              style={tw`border border-indigo-400 flex-row items-center bg-amber-200 px-3 py-1 gap-1 rounded-full`}
              onPress={() => changeInfo({ name: food.name })}
            >
              <Icon
                name={food.name === name ? 'check' : 'plus'}
                type='MaterialCommunityIcons'
                size={14}
                color={INDIGO}
              />
              <Text style={tw`text-indigo-500`} fontSize={12}>
                {food.name}
              </Text>
            </TouchableOpacity>
          ))}
          {matchedFoods.length > 3 && (
            <Text style={tw`ml-2 text-indigo-500`}>
              ...+{matchedFoods.slice(3).length}개
            </Text>
          )}
        </View>
      )}

      {modalVisible && (
        <FormItemDetailModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title='자주 먹는 식료품에서 선택'
          currentChecked={name}
          onCheckBoxPress={onCheckBoxPress}
        />
      )}
    </>
  );
}
