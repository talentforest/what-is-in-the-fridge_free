import { ModalTitle } from '../modal/Modal';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';
import { FormStep } from '../../constant/formInfo';
import { useSwiperAnimation } from '../../hooks';
import { closeKeyboard } from '../../util';

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
  formSteps: FormStep[];
}

export default function Form({ title, formSteps }: Props) {
  const {
    moveStep,
    stepTranslateX,
    panResponder,
    currentStep, //
  } = useSwiperAnimation({ steps: formSteps });

  return (
    <View>
      <View style={tw`px-4`}>
        <FormStepHeader
          formSteps={formSteps}
          currentStep={currentStep as FormStep}
        />
      </View>

      <View style={tw`overflow-hidden w-full min-h-60`}>
        <Animated.View
          style={{
            transform: [{ translateX: stepTranslateX }],
          }}
          {...panResponder.panHandlers}
        >
          <TouchableWithoutFeedback onPress={closeKeyboard}>
            <View style={tw`flex-row gap-0.5`}>
              {formSteps.map(({ step, name }) => (
                <View
                  key={step}
                  style={tw`w-full border border-stone-100 px-4`}
                >
                  {name === '기본정보' && (
                    <FormSectionContainer>
                      <NameItem isEditing={title === '식료품 정보 수정'} />

                      <CategoryItem
                        isAddNewOne={title === '새로운 식료품 추가'}
                      />

                      <FavoriteItem isEditing={title === '식료품 정보 수정'} />
                    </FormSectionContainer>
                  )}

                  {name === '위치' && (
                    <FormSectionContainer>
                      <SpaceItem
                        label={
                          title === '식료품 정보 수정'
                            ? '식료품 위치 수정'
                            : '추가할 식료품의 위치'
                        }
                      />
                    </FormSectionContainer>
                  )}

                  {name === '소비기한' && (
                    <FormSectionContainer>
                      <ExpiredDateItem />
                    </FormSectionContainer>
                  )}

                  {name === '선택정보' && (
                    <FormSectionContainer>
                      <View style={tw`min-h-50 gap-1`}>
                        <PurchaseDateItem />

                        <QuantityItem />

                        <MemoItem />
                      </View>
                    </FormSectionContainer>
                  )}
                </View>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>

      {/* 단계 */}
      <View style={tw`px-4`}>
        <FormStepBottom
          moveStep={moveStep}
          currentStep={currentStep.step}
          stepLength={formSteps.length}
        />
      </View>
    </View>
  );
}
