import { ModalTitle } from '../modal/Modal';
import { TouchableWithoutFeedback, View } from 'react-native';
import { FormStep } from '../../constant/formInfo';
import { closeKeyboard, findMatchNameFoods } from '../../util';
import { useState } from 'react';
import { useFindFood, useItemSlideAnimation } from '../../hooks';
import { Animated } from 'react-native';
import { useSelector } from '../../redux/hook';

import FormSectionContainer from './FormSectionContainer';
import CategoryItem from './CategoryItem';
import SpaceItem from './SpaceItem';
import ExpiredDateItem from './ExpiredDateItem';
import NameItem from './NameItem';
import FavoriteItem from './FavoriteItem';
import PurchaseDateItem from './PurchaseDateItem';
import QuantityItem from './QuantityItem';
import MemoItem from './MemoItem';
import Swiper from '../common/Swiper';
import tw from 'twrnc';

interface Props {
  title: ModalTitle;
  formSteps: FormStep[];
}

export default function Form({ title, formSteps }: Props) {
  const { isFavorite } = useSelector((state) => state.isFavorite);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { isExpiredItemClosed, isPurchaseItemOpen } = useSelector(
    (state) => state.isFormItemOpen
  );

  const {
    formFood: { name },
  } = useSelector((state) => state.formFood);
  const [recommendListHeight, setRecommendListHeight] = useState(0);

  const { findFood } = useFindFood();

  const allDateItemsClosed = isExpiredItemClosed && !isPurchaseItemOpen;
  const oneDateItemOpen = isExpiredItemClosed || !isPurchaseItemOpen;

  const recommendFoodList = findMatchNameFoods(favoriteFoods, name).filter(
    (food) => !findFood(food.name)
  );

  const formHeight = allDateItemsClosed ? 320 : oneDateItemOpen ? 400 : 475;
  const recommendHeight =
    !!recommendFoodList.length && !isFavorite ? recommendListHeight : 0;

  const { height } = useItemSlideAnimation({
    initialValue: formHeight,
    toValue: formHeight + recommendHeight,
    active:
      isPurchaseItemOpen || isExpiredItemClosed || recommendListHeight !== 0,
  });

  return (
    <Animated.View
      style={tw.style(`mt-2.5 overflow-hidden -mx-1 px-1`, { height })}
    >
      <TouchableWithoutFeedback onPress={closeKeyboard}>
        <Swiper steps={formSteps} isForm>
          <View style={tw`gap-0.5 flex-1 flex-row`}>
            {formSteps.map(({ step, name }) => (
              <View key={step} style={tw`w-full border border-stone-100 px-4`}>
                {name === '기본정보' && (
                  <FormSectionContainer>
                    <NameItem
                      isEditing={title === '식료품 정보 수정'}
                      recommendListHeight={recommendListHeight}
                      setRecommendListHeight={setRecommendListHeight}
                    >
                      <FavoriteItem isEditing={title === '식료품 정보 수정'} />
                    </NameItem>

                    <CategoryItem
                      isAddNewOne={
                        title === '새로운 식료품 추가' ||
                        title === '장보기 목록 식료품 추가'
                      }
                    />

                    <ExpiredDateItem />

                    <PurchaseDateItem />
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

                {name === '추가정보' && (
                  <FormSectionContainer>
                    <View style={tw`flex-1 gap-2`}>
                      <QuantityItem />

                      <MemoItem />
                    </View>
                  </FormSectionContainer>
                )}
              </View>
            ))}
          </View>
        </Swiper>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}
