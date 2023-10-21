import { useRoute } from '@react-navigation/native';
import { ReactNode } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
  active?: boolean;
}

export default function TableFooterContainer({ children, active }: Props) {
  const route = useRoute();
  const routeExpiredFoods = route.name === 'ExpiredFoods';

  return (
    <View
      style={tw.style(
        `bg-stone-100 ${
          !routeExpiredFoods || active ? 'border-t border-gray-300' : ''
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
