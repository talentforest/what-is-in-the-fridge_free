import { Animated, TouchableWithoutFeedback } from 'react-native';
import { View } from 'react-native';
import { useSwiperAnimation } from '../../hooks';
import { ViewingStep } from '../../constant/viewing';
import { ReactNode, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { closeKeyboard } from '../../util';

import HeaderIconBtn from '../buttons/HeaderIconBtn';
import tw from 'twrnc';

interface Props {
  steps: ViewingStep[];
  children: ReactNode;
  headerIcon?: boolean;
}

export default function Swiper({ steps, children, headerIcon }: Props) {
  const {
    moveStep,
    stepTranslateX,
    currentStep,
    panResponder, //
  } = useSwiperAnimation({ steps });

  const navigation = useNavigation();

  const setHeaderIcon = () => {
    return navigation.setOptions({
      headerRight: () => (
        <HeaderIconBtn
          iconName='arrow-switch'
          iconSize={15}
          onPress={() =>
            moveStep(currentStep.step === 1 ? 'next' : 'prev', currentStep.step)
          }
        />
      ),
    });
  };

  useEffect(() => {
    headerIcon ? setHeaderIcon() : null;
  }, [currentStep.step]);

  return (
    <View style={tw`overflow-hidden w-full flex-1`}>
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateX: stepTranslateX }],
        }}
        {...panResponder.panHandlers}
      >
        <TouchableWithoutFeedback onPress={closeKeyboard}>
          <View style={tw`flex-row flex-1`}>{children}</View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
}
