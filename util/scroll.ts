import { MutableRefObject } from 'react';
import { FlatList, ScrollView } from 'react-native';

export const scrollToIndex = (
  flatListRef: MutableRefObject<FlatList>,
  index: number
) => {
  flatListRef?.current?.scrollToIndex({
    animated: true,
    index,
    viewOffset: 10,
  });
};

export const scrollToEnd = (scrollViewRef: MutableRefObject<ScrollView>) => {
  scrollViewRef?.current?.scrollToEnd({ animated: true });
};

export const scrollTo = (
  scrollViewRef: MutableRefObject<ScrollView>,
  x: number,
  y: number
) => {
  scrollViewRef?.current?.scrollTo({ x, y, animated: true });
};
