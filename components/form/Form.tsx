import { ModalTitle } from '../modal/Modal';
import {
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Food } from '../../constant/foods';
import { FormLabelType, FormStep } from '../../constant/formInfo';
import { useSwiperAnimation } from '../../hooks';

import FormSectionContainer from './FormSectionContainer';
import CategoryItem from './CategoryItem';
import SpaceItem from './SpaceItem';
import DateItem from './DateItem';
import NameItem from './NameItem';
import FavoriteItem from './FavoriteItem';
import FormControlStep from './FormControlStep';
import tw from 'twrnc';

interface Props {
  title: ModalTitle;
  items: FormLabelType[];
  food: Food;
  changeInfo: (newInfo: { [key: string]: string | boolean }) => void;
  editableName?: boolean;
  formSteps: FormStep[];
}

export default function Form({
  title,
  items,
  changeInfo,
  food,
  editableName,
  formSteps,
}: Props) {
  const {
    moveStep,
    FORM_WIDTH,
    stepTranslateX,
    panResponder,
    currentStep, //
  } = useSwiperAnimation({ steps: formSteps });

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
      <FormControlStep
        moveStep={moveStep}
        currentStep={currentStep.step}
        stepLength={formSteps.length}
      />
    </View>
  );
}
