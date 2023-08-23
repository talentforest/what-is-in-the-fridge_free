import { Animated, Dimensions, PanResponder, View } from 'react-native';
import { Food } from '../../../constant/foods';
import { useEffect, useRef, useState } from 'react';
import { FormStep, FormLabel, FormStepName } from '../../../constant/formInfo';
import { scaleH } from '../../../util';
import { Text } from '../../native-component';
import FormItemContainer from './FormItemContainer';
import CategoryItem from './CategoryItem';
import SpaceItem from './SpaceItem';
import DateItem from './DateItem';
import NameItem from './NameItem';
import FavoriteItem from './FavoriteItem';
import StepIndicator from './StepIndicator';
import ArrowBtn from '../buttons/ArrowBtn';
import tw from 'twrnc';
import FormSectionContainer from './FormSectionContainer';

interface Props {
  title: '장보기 목록 식료품 추가' | '새로운 식료품 추가' | '식료품 정보 수정';
  items: FormLabel[];
  food: Food;
  changeInfo: (newInfo: { [key: string]: string | boolean }) => void;
  editableName?: boolean;
  formSteps: FormStep[];
}

const DRAG_DISTANCE = 60;
const FORM_WIDTH = Dimensions.get('screen').width - 34;
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
      onMoveShouldSetPanResponder: () => true,
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
    <View style={tw`mt-[${scaleH(5)}px]`}>
      <View style={tw`overflow-hidden pb-0`}>
        <Animated.View
          style={{
            width: FORM_WIDTH,
            height: scaleH(350),
            transform: [{ translateX: stepTranslateX }],
          }}
          {...panResponder.panHandlers}
        >
          <View style={tw`flex-row flex-1`}>
            <FormSectionContainer>
              {items.includes('식료품 이름') && (
                <FormItemContainer label='식료품 이름'>
                  <NameItem
                    name={food.name}
                    changeInfo={changeInfo}
                    editable={editableName || false}
                  />
                  {!!!editableName && (
                    <Text style={tw`pt-2 text-amber-600`} fontSize={12}>
                      이름은 수정할 수 없습니다.
                    </Text>
                  )}
                </FormItemContainer>
              )}
              {items.includes('카테고리') && (
                <FormItemContainer label='카테고리'>
                  <CategoryItem
                    fixedCategory={food.category}
                    changeInfo={changeInfo}
                  />
                </FormItemContainer>
              )}
              {items.includes('자주 먹는 식품') && (
                <FormItemContainer label='자주 먹는 식품'>
                  <FavoriteItem
                    name={food.name}
                    favoriteState={food.favorite}
                    changeInfo={changeInfo}
                    disabled={title !== '식료품 정보 수정'}
                  />
                </FormItemContainer>
              )}
            </FormSectionContainer>

            <FormSectionContainer>
              {items.includes('구매날짜') && (
                <FormItemContainer label='구매날짜'>
                  <DateItem date={food.purchaseDate} changeInfo={changeInfo} />
                </FormItemContainer>
              )}
              {items.includes('유통기한') && (
                <FormItemContainer label='유통기한'>
                  <DateItem
                    expiredInfo
                    date={food.expiredDate}
                    changeInfo={changeInfo}
                  />
                </FormItemContainer>
              )}
            </FormSectionContainer>

            {items.includes('냉장고 위치 선택') && (
              <FormSectionContainer>
                <FormItemContainer label='냉장고 위치 선택'>
                  <SpaceItem food={food} changeInfo={changeInfo} />
                </FormItemContainer>
              </FormSectionContainer>
            )}
          </View>
        </Animated.View>
      </View>

      {/* 단계 */}
      <View style={tw`items-center flex-row justify-between mb-2`}>
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
