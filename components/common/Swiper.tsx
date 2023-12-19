import { Animated, TouchableWithoutFeedback } from 'react-native';
import { View } from 'react-native';
import { useSwiperAnimation } from '../../hooks';
import { ViewingStep } from '../../constant/viewing';
import { ReactNode, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { closeKeyboard } from '../../util';

import HeaderIconBtn from '../buttons/HeaderIconBtn';
import tw from 'twrnc';
import { FormStep } from '../../constant/formInfo';
import FormStepBottom from '../form/FormStepBottom';
import FormStepHeader from '../form/FormStepHeader';

interface Props {
  steps: ViewingStep[] | FormStep[];
  children: ReactNode;
  headerIcon?: boolean;
  isForm?: boolean;
}

export default function Swiper({ steps, children, headerIcon, isForm }: Props) {
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
    <>
      {isForm && (
        <View style={tw`px-4`}>
          <FormStepHeader
            formSteps={steps as FormStep[]}
            currentStep={currentStep as FormStep}
          />
        </View>
      )}

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

      {isForm && (
        <View style={tw`px-2`}>
          <FormStepBottom
            moveStep={moveStep}
            currentStep={currentStep.step}
            stepLength={steps.length}
          />
        </View>
      )}
    </>
  );
}
