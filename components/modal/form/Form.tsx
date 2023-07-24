import { Animated, PanResponder, View } from 'react-native';
import { Food } from '../../../constant/foods';
import { useEffect, useRef } from 'react';
import { FormStep, FormLabel } from '../../../constant/formInfo';
import { scaleH } from '../../../util';
import FormItemContainer from './FormItemContainer';
import CategoryItem from './CategoryItem';
import IconItem from './IconItem';
import SpaceItem from './SpaceItem';
import DateItem from './DateItem';
import NameItem from './NameItem';
import FavoriteItem from './FavoriteItem';
import StepIndicator from './StepIndicator';
import ArrowBtn from '../../common/Buttons/ArrowBtn';
import useHandleStep from '../../../hooks/useHandleStep';
import tw from 'twrnc';

interface Props {
  items: FormLabel[];
  food: Food;
  changeInfo: (newInfo: { [key: string]: string | boolean }) => void;
  editableName?: boolean;
  formSteps: FormStep[];
}

export default function Form({
  items,
  changeInfo,
  food,
  editableName,
  formSteps,
}: Props) {
  const {
    goNextStep,
    goPreviousStep,
    currentStep,
    setCurrentStep, //
  } = useHandleStep(formSteps);
  const currentStepRef = useRef(currentStep);

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (_, { dx }) => {
        translateX.setValue(dx);
      },
      onPanResponderRelease: (_, { dx }) => {
        if (dx > 150) {
          goPreviousStep(currentStepRef.current.id);
        } else if (dx < -150) {
          goNextStep(currentStepRef.current.id);
        }
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  return (
    <View style={tw`mt-[${scaleH(14)}px]`}>
      <Animated.View
        style={{
          height: scaleH(300),
          transform: [{ scale }, { translateX }],
        }}
        {...panResponder.panHandlers}
      >
        {currentStep?.name === '식품 정보' && (
          <View>
            {items.includes('아이콘과 이름') && (
              <FormItemContainer label='아이콘과 이름'>
                <View style={tw`flex-row items-center gap-1`}>
                  <IconItem value={food.image} changeInfo={changeInfo} />
                  <NameItem
                    name={food.name}
                    changeInfo={changeInfo}
                    editable={editableName || false}
                  />
                </View>
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

            {items.includes('자주 먹는 식품인가요?') && (
              <FormItemContainer label='자주 먹는 식품인가요?'>
                <FavoriteItem
                  favorite={food.favorite}
                  changeInfo={changeInfo}
                />
              </FormItemContainer>
            )}
          </View>
        )}
        <View>
          {currentStep?.name === '식품 위치' &&
            items.includes('냉장고 위치 선택') && (
              <FormItemContainer label='냉장고 위치 선택'>
                <SpaceItem food={food} changeInfo={changeInfo} />
              </FormItemContainer>
            )}
        </View>
        <View>
          {currentStep?.name === '식품 날짜' && (
            <View>
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
            </View>
          )}
        </View>
      </Animated.View>

      <View style={tw`items-center flex-row justify-between`}>
        <ArrowBtn
          type='previous'
          moveStep={() => goPreviousStep(currentStep.id)}
          active={currentStep?.id > 1 || false}
        />
        <StepIndicator
          formSteps={formSteps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        <ArrowBtn
          type='next'
          moveStep={() => goNextStep(currentStep.id)}
          active={currentStep?.id < formSteps.length || false}
        />
      </View>
    </View>
  );
}
