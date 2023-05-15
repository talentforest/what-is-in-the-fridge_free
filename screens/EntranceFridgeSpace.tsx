import { Text } from '../components/native-component';
import { Animated, View } from 'react-native';
import { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import tw from 'twrnc';
import ClosedFridge from '../components/screen-component/entrance-fridge/ClosedFridge';
import OpenFridge from '../components/screen-component/entrance-fridge/OpenFridge';

export default function EntranceFridgeSpace() {
  const [open, setOpen] = useState(false);
  const statusBarHeight = getStatusBarHeight(true);

  const onTogglePress = () => setOpen((prev) => !prev);

  return (
    <View
      style={tw`flex-1 px-4 pb-2 bg-neutral-50 pt-[${statusBarHeight + 14}px]`}
    >
      <Text styletw='pb-2 text-lg text-slate-600'>나의 냉장고</Text>
      <View style={tw.style('flex-1 justify-center items-center pr-4 pl-8')}>
        {open ? (
          <OpenFridge />
        ) : (
          <ClosedFridge onTogglePress={() => onTogglePress()} />
        )}
      </View>
    </View>
  );
}
