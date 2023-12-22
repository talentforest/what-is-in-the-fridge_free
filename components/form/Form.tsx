import { ModalTitle } from '../modal/Modal';
import { TouchableWithoutFeedback, View } from 'react-native';
import { FormStep } from '../../constant/formInfo';
import { closeKeyboard } from '../../util';
import { useState } from 'react';
import { useItemSlideAnimation } from '../../hooks';
import { Animated } from 'react-native';

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
import { useSelector } from '../../redux/hook';

interface Props {
  title: ModalTitle;
  formSteps: FormStep[];
}

export default function Form({ title, formSteps }: Props) {
  const { isExpiredItemClosed, isPurchaseItemOpen } = useSelector(
    (state) => state.isFormItemOpen
  );
  const allDateItemsOpen = isExpiredItemClosed && !isPurchaseItemOpen;
  const oneDateItemOpen = isExpiredItemClosed || !isPurchaseItemOpen;

  const { height } = useItemSlideAnimation({
    initialValue: allDateItemsOpen ? 320 : oneDateItemOpen ? 400 : 450,
    toValue: allDateItemsOpen ? 340 : oneDateItemOpen ? 420 : 470,
    active: isPurchaseItemOpen,
  });

  return (
    <Animated.View
      style={tw.style(`mt-2.5 overflow-hidden -mx-1 px-1`, {
        height,
      })}
    >
      <TouchableWithoutFeedback onPress={closeKeyboard}>
        <Swiper steps={formSteps} isForm>
          <View style={tw`gap-0.5 flex-1 flex-row`}>
            {formSteps.map(({ step, name }) => (
              <View key={step} style={tw`w-full border border-stone-100 px-4`}>
                {name === '기본정보' && (
                  <FormSectionContainer>
                    <NameItem isEditing={title === '식료품 정보 수정'}>
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
