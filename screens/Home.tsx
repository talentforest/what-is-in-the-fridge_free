import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BG_COLOR } from '../components/common/Container';

import ShoppingList from './HomeShoppingList';
import HomeFridge from './HomeFridge';
import StepIndicator from '../components/common/StepIndicator';
import tw from 'twrnc';

const renderScene = SceneMap({
  first: HomeFridge,
  second: ShoppingList,
});

export default function Home() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: '냉장고에 뭐가 있지' },
    { key: 'second', title: '장볼게 뭐가 있지' },
  ]);

  return (
    <TabView
      renderTabBar={() => (
        <SafeAreaView
          edges={['top']}
          style={tw`${BG_COLOR} items-start pt-3 pl-6 w-full`}
        >
          <StepIndicator
            stepLength={routes.length}
            currentStepId={index + 1}
            size={2}
            color={'indigo'}
          />
        </SafeAreaView>
      )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
