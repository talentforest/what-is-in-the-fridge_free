import { ReactNode } from 'react';
import { View } from 'react-native';
import { useSelector } from '../../redux/hook';
import { useRouteName } from '../../hooks/useRouteName';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
}

export default function TableFooterContainer({ children }: Props) {
  const { routeAllFoods } = useRouteName();

  const { checkedList } = useSelector((state) => state.checkedList);

  const active = !!checkedList.length;

  return (
    <View
      style={tw.style(
        `bg-stone-100 ${
          !routeAllFoods || active ? 'border-t border-gray-300' : ''
        } px-4 -mx-4 -mb-3`,
        {
          shadowColor: '#aaa',
          shadowOpacity: 0.2,
          shadowRadius: 10,
          shadowOffset: { height: -10, width: 0 },
        }
      )}
    >
      {children}
    </View>
  );
}
