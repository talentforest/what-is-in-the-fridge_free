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
import FormStepBottom from './FormStepBottom';
import PurchaseDateItem from './PurchaseDateItem';
import QuantityItem from './QuantityItem';
import MemoItem from './MemoItem';
import FormStepHeader from './FormStepHeader';
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
      <FormStepHeader
        formSteps={formSteps}
        currentStep={currentStep as FormStep}
      />
      <View style={tw`overflow-hidden mb-3 min-h-60`}>
        <Animated.View
          style={{
            transform: [{ translateX: stepTranslateX }],
          }}
          {...panResponder.panHandlers}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={tw`flex-row`}>
              {formSteps.map(({ step, name }) => (
                <View key={step} style={tw`w-full border border-stone-100`}>
                  {name === '기본정보' && (
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
                  {name === '위치' && (
                    <FormSectionContainer>
                      <SpaceItem food={food} changeInfo={changeInfo} />
                    </FormSectionContainer>
                  )}
                  {name === '소비기한' && (
                    <FormSectionContainer>
                      <ExpiredDateItem
                        date={food.expiredDate}
                        changeInfo={changeInfo}
                      />
                    </FormSectionContainer>
                  )}
                  {name === '선택정보' && (
                    <View style={tw`w-full gap-3 py-2 px-6`}>
                      <PurchaseDateItem
                        date={food.purchaseDate}
                        changeInfo={changeInfo}
                      />
                      <QuantityItem
                        quantity={food.quantity}
                        changeInfo={changeInfo}
                      />
                      <MemoItem memo={food.memo} changeInfo={changeInfo} />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>

      {/* 단계 */}
      <FormStepBottom
        moveStep={moveStep}
        currentStep={currentStep.step}
        stepLength={formSteps.length}
      />
    </View>
  );
}
