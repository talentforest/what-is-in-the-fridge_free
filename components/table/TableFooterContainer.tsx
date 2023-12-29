import { ReactNode } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from '../../redux/hook';
import { setCheckedList } from '../../redux/slice/food-list/checkListSlice';
import { TouchableOpacity } from '../common/native-component';
import { MEDIUM_GRAY } from '../../constant/colors';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
  color?: 'stone' | 'indigo' | 'yellow';
}

export default function TableFooterContainer({ children, color }: Props) {
  const { checkedList } = useSelector((state) => state.checkedList);

  const active = !!checkedList.length;

  const dispatch = useDispatch();

  const uncheckAllItems = () => dispatch(setCheckedList([]));

  return (
    <View style={tw.style(`w-full bg-${color}-100 rounded-t-3xl -mt-3`)}>
      {children}

      {active && (
        <TouchableOpacity
          onPress={uncheckAllItems}
          style={tw`absolute -top-11 p-2 right-4 rounded-full`}
        >
          <Icon
            name='x-circle-fill'
            type='Octicons'
            size={28}
            color={MEDIUM_GRAY}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
