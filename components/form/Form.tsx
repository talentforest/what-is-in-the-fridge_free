import { ModalTitle } from '../modal/Modal';
import { TouchableWithoutFeedback, View } from 'react-native';
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
  return (
    <View>
      <View style={tw`min-h-95 `}>
        <TouchableWithoutFeedback onPress={closeKeyboard}>
          <Swiper steps={formSteps} isForm>
            {formSteps.map(({ step, name }) => (
              <View key={step} style={tw`w-full border border-stone-100 px-4`}>
                {name === '필수정보' && (
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
                    <View style={tw`min-h-50 gap-1`}>
                      <PurchaseDateItem />

                      <QuantityItem />

                      <MemoItem />
                    </View>
                  </FormSectionContainer>
                )}
              </View>
            ))}
          </Swiper>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
