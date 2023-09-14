import { ModalTitle } from '../modal/Modal';
import {
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Food } from '../../constant/foodInfo';
import { FormStep } from '../../constant/formInfo';
import { useSwiperAnimation } from '../../hooks';

import FormSectionContainer from './FormSectionContainer';
import CategoryItem from './CategoryItem';
import SpaceItem from './SpaceItem';
import ExpiredDateItem from './ExpiredDateItem';
import NameItem from './NameItem';
import FavoriteItem from './FavoriteItem';
import FormControlStep from './FormControlStep';
import PurchaseDateItem from './PurchaseDateItem';
import tw from 'twrnc';

interface Props {
  title: ModalTitle;
  food: Food;
  changeInfo: (newInfo: { [key: string]: string | boolean }) => void;
  editableName?: boolean;
  formSteps: FormStep[];
}

export default function Form({
  title,
  changeInfo,
  food,
  editableName,
  formSteps,
}: Props) {
  const {
    moveStep,
    stepTranslateX,
    panResponder,
    currentStep, //
  } = useSwiperAnimation({ steps: formSteps });

  return (
    <View>
      <View style={tw`overflow-hidden`}>
        <Animated.View
          style={{
            height: 315,
            transform: [{ translateX: stepTranslateX }],
          }}
          {...panResponder.panHandlers}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={tw`flex-row flex-1`}>
              {formSteps.map(({ step, name }) => (
                <View key={step} style={tw`w-full`}>
                  {name === '식품 정보' && (
                    <FormSectionContainer>
                      <NameItem
                        name={food.name}
                        changeInfo={changeInfo}
                        editable={editableName || false}
                      />
                      <CategoryItem
                        name={food.name}
                        fixedCategory={food.category}
                        changeInfo={changeInfo}
                        title={title}
                      />
                      <FavoriteItem food={food} title={title} />
                    </FormSectionContainer>
                  )}
                  {name === '식품 위치' && (
                    <FormSectionContainer>
                      <SpaceItem food={food} changeInfo={changeInfo} />
                    </FormSectionContainer>
                  )}
                  {name === '식품 날짜' && (
                    <FormSectionContainer>
                      <ExpiredDateItem
                        date={food.expiredDate}
                        changeInfo={changeInfo}
                      />
                      <PurchaseDateItem
                        date={food.purchaseDate}
                        changeInfo={changeInfo}
                      />
                    </FormSectionContainer>
                  )}
                </View>
              ))}
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
