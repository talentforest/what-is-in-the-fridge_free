import { ModalTitle } from '../modal/Modal';
import {
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Food, PantryFood } from '../../constant/foodInfo';
import { FormStep } from '../../constant/formInfo';
import { useSwiperAnimation } from '../../hooks';
import { useRoute } from '@react-navigation/native';

import FormSectionContainer from './FormSectionContainer';
import CategoryItem from './CategoryItem';
import SpaceItem from './SpaceItem';
import ExpiredDateItem from './ExpiredDateItem';
import NameItem from './NameItem';
import FavoriteItem from './FavoriteItem';
import FormControlStep from './FormControlStep';
import PurchaseDateItem from './PurchaseDateItem';
import FormInfoType from './FormInfoType';
import tw from 'twrnc';

interface Props {
  title: ModalTitle;
  food: Food | PantryFood;
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
  const route = useRoute();
  const routePantryFoods = route.name === 'PantryFoods';

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
            height: routePantryFoods ? 350 : 325,
            transform: [{ translateX: stepTranslateX }],
          }}
          {...panResponder.panHandlers}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={tw`flex-row flex-1`}>
              {formSteps.map(({ step, name }) => (
                <View key={step} style={tw`w-full`}>
                  {name === '식품 정보' && (
                    <View>
                      {routePantryFoods && <FormInfoType title='필수정보' />}
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
                          disabled={title !== '식료품 정보 수정'}
                        />
                        <FavoriteItem
                          title={title}
                          name={food.name}
                          favoriteState={food.favorite}
                          changeInfo={changeInfo}
                          disabled={title !== '식료품 정보 수정'}
                        />
                      </FormSectionContainer>
                    </View>
                  )}
                  {name === '식품 날짜' && (
                    <View>
                      {routePantryFoods && <FormInfoType title='선택정보' />}
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
                    </View>
                  )}
                  {name === '식품 위치' && (
                    <FormSectionContainer>
                      <SpaceItem food={food as Food} changeInfo={changeInfo} />
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
