import { ModalTitle } from '../modal/Modal';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { FormStep } from '../../constant/formInfo';
import { closeKeyboard } from '../../util';

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
  const { width } = useWindowDimensions();

  return (
    <Pressable style={tw`flex-1 -mx-1 px-1`} onPress={closeKeyboard}>
      <Swiper steps={formSteps} swiperWidth={width - 32} isForm>
        <View style={tw`gap-0.5 flex-1 flex-row`}>
          {formSteps.map(({ step, name }) => (
            <View key={step} style={tw`w-full border border-slate-200 px-4`}>
              {name === '기본정보' && (
                <FormSectionContainer>
                  <NameItem isEditing={title === '식료품 정보 수정'} />

                  <CategoryItem
                    isAddNewOne={
                      title === '새로운 식료품 추가' ||
                      title === '장보기 목록 식료품 추가'
                    }
                  />

                  <FavoriteItem isEditing={title === '식료품 정보 수정'} />
                </FormSectionContainer>
              )}

              {name === '날짜정보' && (
                <FormSectionContainer>
                  <ExpiredDateItem />

                  <PurchaseDateItem />
                </FormSectionContainer>
              )}

              {name === '위치정보' && (
                <SpaceItem label={'추가할 식료품의 위치'} />
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
    </Pressable>
  );
}
