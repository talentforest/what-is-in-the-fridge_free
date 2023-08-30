import { ModalTitle } from '../modal/Modal';
import {
  Animated,
  Dimensions,
  Keyboard,
  PanResponder,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Food } from '../../../constant/foods';
import { useEffect, useRef, useState } from 'react';
import {
  FormStep,
  FormLabelType,
  FormStepName,
} from '../../../constant/formInfo';

import FormSectionContainer from './FormSectionContainer';
import CategoryItem from './CategoryItem';
import SpaceItem from './SpaceItem';
import DateItem from './DateItem';
import NameItem from './NameItem';
import FavoriteItem from './FavoriteItem';
import StepIndicator from './StepIndicator';
import ArrowBtn from '../buttons/ArrowBtn';
import tw from 'twrnc';

interface Props {
  title: ModalTitle;
  items: FormLabelType[];
  food: Food;
  changeInfo: (newInfo: { [key: string]: string | boolean }) => void;
  editableName?: boolean;
  formSteps: FormStep[];
}

const DRAG_DISTANCE = 60;
const FORM_WIDTH = Dimensions.get('screen').width;
const initialStep = {
  id: 1,
  name: '식품 정보' as FormStepName,
};

export default function Form({
  title,
  items,
  changeInfo,
  food,
  editableName,
  formSteps,
}: Props) {
  const [currentStep, setCurrentStep] = useState<FormStep>(initialStep);
  const currentStepRef = useRef<FormStep>(initialStep);
  const stepTranslateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  const animatedForm = (stepId: number) => {
    Animated.timing(stepTranslateX, {
      toValue: -FORM_WIDTH * stepId,
      useNativeDriver: true,
      duration: 200,
    }).start();
  };

  const moveStep = (direction: 'prev' | 'next', currentStepId: number) => {
    const prevStepId = currentStepId === 1 ? 0 : currentStepId - 2;
    const nextStepId =
      currentStepId === formSteps.length ? currentStepId - 1 : currentStepId;
    const stepId = direction === 'prev' ? prevStepId : nextStepId;

    animatedForm(stepId);
    setCurrentStep(formSteps[stepId]);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, { dx, dy }) => {
        return dx > 2 || dx < -2 || dy > 2 || dy < -2;
      },
      onMoveShouldSetPanResponderCapture: (_, { dx, dy }) => {
        return dx > 2 || dx < -2 || dy > 2 || dy < -2;
      },
      onPanResponderGrant: () => {
        stepTranslateX.setValue(-FORM_WIDTH * (currentStepRef.current.id - 1));
      },
      onPanResponderMove: (_, { dx }) => {
        stepTranslateX.setValue(
          -FORM_WIDTH * (currentStepRef.current.id - 1) + dx
        );
      },
      onPanResponderRelease: (_, { dx }) => {
        if ((0 > dx && dx > -DRAG_DISTANCE) || (0 < dx && dx < DRAG_DISTANCE)) {
          return animatedForm(currentStepRef.current.id - 1);
        }
        if (dx > DRAG_DISTANCE) {
          return moveStep('prev', currentStepRef.current.id);
        }
        if (dx < -DRAG_DISTANCE) {
          return moveStep('next', currentStepRef.current.id);
        }
      },
    })
  ).current;

  return (
    <View>
      <View style={tw`overflow-hidden pb-0`}>
        <Animated.View
          style={{
            width: FORM_WIDTH,
            height: 360,
            transform: [{ translateX: stepTranslateX }],
          }}
          {...panResponder.panHandlers}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={tw`flex-row flex-1`}>
              <FormSectionContainer>
                {items.includes('식료품 이름') && (
                  <NameItem
                    title={title}
                    name={food.name}
                    changeInfo={changeInfo}
                    editable={editableName || false}
                  />
                )}
                {items.includes('카테고리') && (
                  <CategoryItem
                    name={food.name}
                    fixedCategory={food.category}
                    changeInfo={changeInfo}
                    disabled={title !== '식료품 정보 수정'}
                  />
                )}
                {items.includes('자주 먹는 식품') && (
                  <FavoriteItem
                    name={food.name}
                    favoriteState={food.favorite}
                    changeInfo={changeInfo}
                    disabled={title !== '식료품 정보 수정'}
                  />
                )}
              </FormSectionContainer>

              <FormSectionContainer>
                {items.includes('구매날짜') && (
                  <DateItem date={food.purchaseDate} changeInfo={changeInfo} />
                )}
                {items.includes('유통기한') && (
                  <DateItem
                    expiredInfo
                    date={food.expiredDate}
                    changeInfo={changeInfo}
                  />
                )}
              </FormSectionContainer>

              {items.includes('냉장고 위치 선택') && (
                <FormSectionContainer>
                  <SpaceItem food={food} changeInfo={changeInfo} />
                </FormSectionContainer>
              )}
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>

      {/* 단계 */}
      <View style={tw`items-center flex-row justify-between mx-4 my-2`}>
        <ArrowBtn
          type='previous'
          moveStep={() => moveStep('prev', currentStep.id)}
          active={currentStep.id > 1}
        />
        <StepIndicator formSteps={formSteps} currentStepId={currentStep.id} />
        <ArrowBtn
          type='next'
          moveStep={() => moveStep('next', currentStep.id)}
          active={formSteps.length > currentStep.id}
        />
      </View>
    </View>
  );
}
