import { View } from 'react-native';
import { getCompartments, isFridgeFood, isPantryFood } from '../../util';
import { useDispatch, useSelector } from '../../redux/hook';
import { Text, TouchableOpacity } from '../common/native-component';
import {
  CompartmentNum,
  StorageType,
  Space,
  SpaceSide,
  SpaceType,
} from '../../constant/fridgeInfo';
import { FormLabelType } from '../../constant/formInfo';
import { editFormFood } from '../../redux/slice/food/formFoodSlice';
import { LIGHT_GRAY } from '../../constant/colors';

import CheckBoxItem from '../common/CheckBoxItem';
import FormLabel from './FormLabel';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  label: FormLabelType;
}

export default function SpaceItem({ label }: Props) {
  const {
    formFood: { space, compartmentNum },
  } = useSelector((state) => state.formFood);
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const dispatch = useDispatch();

  const spaceType = space.slice(0, 3);
  const spaceSide = space.slice(4, 6);

  const maxCompartmentsNum = fridgeInfo.compartments[space];
  const compartments = getCompartments(maxCompartmentsNum);

  const getCompartmentNum = (space: Space) => {
    if (compartmentNum) {
      const maxNum = fridgeInfo.compartments[space];

      return +compartmentNum.slice(0, 1) > maxNum
        ? `${maxNum}번`
        : compartmentNum;
    }
    return '1번';
  };

  const onFridgeSpacePress = (space: Space) =>
    dispatch(editFormFood({ space, compartmentNum: getCompartmentNum(space) }));

  const onCompartmentNumPress = (compartmentNum: CompartmentNum) => {
    dispatch(editFormFood({ compartmentNum }));
  };

  const onTabPress = (storage: StorageType) => {
    if (isPantryFood(space) && isPantryFood(storage)) return;
    if (isFridgeFood(space) && isFridgeFood(storage)) return;

    return storage === '냉장고'
      ? dispatch(
          editFormFood({
            space: space === '실온보관' ? '냉장실 안쪽' : space,
            compartmentNum: compartmentNum || '1번',
          })
        )
      : dispatch(editFormFood({ space: '실온보관' }));
  };

  return (
    <View>
      {label !== '식료품 위치 수정' && <FormLabel label={label} />}

      <View style={tw`flex-row items-center pb-0.5 gap-0.5`}>
        {['냉장고', '실온보관'].map((storage) => (
          <TouchableOpacity
            key={storage}
            onPress={() => onTabPress(storage as StorageType)}
            style={tw.style(
              `mt-1 gap-1 py-2 px-3 w-24 justify-center rounded-xl border
             ${
               storage.includes(space.slice(0, 1))
                 ? 'border-blue-200 bg-blue-600'
                 : 'border-gray-200 bg-gray-50'
             } flex-row items-center`
            )}
          >
            <Icon
              type='Octicons'
              name='location'
              size={13}
              color={storage.includes(space.slice(0, 1)) ? '#fff' : LIGHT_GRAY}
            />
            <Text
              style={tw`${
                storage.includes(space.slice(0, 1))
                  ? 'text-white'
                  : 'text-slate-400'
              }`}
            >
              {storage}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {space !== '실온보관' && (
        <View
          style={tw.style(
            `px-3 py-0.5 border border-slate-200 bg-white mt-1 rounded-xl`
          )}
        >
          <View style={tw`flex-row gap-4`}>
            {(['냉장실', '냉동실'] as SpaceType[]).map((spaceType) => (
              <View style={tw`h-9`} key={spaceType}>
                <CheckBoxItem
                  title={spaceType}
                  checked={space.slice(0, 3) === spaceType}
                  onPress={() =>
                    onFridgeSpacePress(`${spaceType} ${spaceSide}` as Space)
                  }
                />
              </View>
            ))}
          </View>

          <View style={tw`flex-row gap-4 border-b border-t border-slate-300`}>
            {(['안쪽', '문쪽'] as SpaceSide[]).map((spaceSide) => (
              <View key={spaceSide} style={tw`h-9`}>
                <CheckBoxItem
                  title={spaceSide}
                  checked={space.includes(spaceSide)}
                  onPress={() =>
                    onFridgeSpacePress(`${spaceType} ${spaceSide}` as Space)
                  }
                />
              </View>
            ))}
          </View>

          <View style={tw`flex-row flex-wrap gap-x-4`}>
            {compartments.map(({ compartmentNum: currCompartmentNum }) => (
              <View key={currCompartmentNum} style={tw`h-9`}>
                <CheckBoxItem
                  title={`${currCompartmentNum}칸`}
                  checked={compartmentNum === currCompartmentNum}
                  onPress={() => onCompartmentNumPress(currCompartmentNum)}
                />
              </View>
            ))}
          </View>
        </View>
      )}

      {space === '실온보관' && (
        <View
          key={spaceType}
          style={tw.style(
            `h-11 px-3 border border-slate-200 bg-white mt-1 rounded-xl`
          )}
        >
          <CheckBoxItem
            title='실온보관'
            checked={space === '실온보관'}
            onPress={() => onTabPress('실온보관')}
          />
        </View>
      )}
    </View>
  );
}
