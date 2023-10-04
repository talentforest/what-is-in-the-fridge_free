import { ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleProp,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { DEVICE_HEIGHT } from '../../util';
import { PlatformIOS } from '../../constant/statusBarHeight';
import { CompartmentNum } from '../../constant/fridgeInfo';

import RNModal from 'react-native-modal';
import SwipeHeader from './SwipeHeader';
import tw from 'twrnc';
import { shadowStyle } from '../../constant/shadowStyle';

export type ModalTitle =
  | '장보기 목록 식료품 추가'
  | '새로운 식료품 추가'
  | '식료품 정보 수정'
  | '식료품 상세 정보'
  | '팬트리 식료품 추가'
  | '팬트리 식료품 수정'
  | '나의 식료품 찾기'
  | '카테고리별 필터링'
  | `${CompartmentNum}칸`
  | '카테고리 선택';

interface Props {
  isVisible: boolean;
  closeModal: () => void;
  children: ReactNode;
  title?: ModalTitle;
  style?: StyleProp<any>;
  animationIn?: 'fadeIn' | 'slideInUp';
  hasBackdrop?: boolean;
}

export default function Modal({
  style,
  title,
  children,
  isVisible,
  closeModal,
  animationIn = 'slideInUp',
  hasBackdrop = true,
}: Props) {
  const MODAL_HEIGHT = DEVICE_HEIGHT * 0.85;

  const positionStyle =
    animationIn === 'fadeIn' ? 'justify-center mx-4' : 'justify-end';

  return (
    <RNModal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      backdropTransitionOutTiming={0} // 안드로이드 깜박임 이슈
      onBackButtonPress={closeModal} // 안드로이드 뒤로 가기 버튼
      onSwipeComplete={closeModal}
      swipeDirection={animationIn === 'fadeIn' ? undefined : ['down']}
      animationInTiming={animationIn === 'fadeIn' ? 600 : 400}
      animationOutTiming={animationIn === 'fadeIn' ? 400 : 700}
      propagateSwipe={true}
      animationIn={animationIn}
      animationOut={animationIn === 'fadeIn' ? 'fadeOut' : 'slideOutDown'}
      statusBarTranslucent={true}
      hasBackdrop={hasBackdrop}
      backdropOpacity={0.7}
      style={tw.style(`m-0 ${positionStyle}`, style)}
    >
      <KeyboardAvoidingView
        enabled
        behavior='padding'
        keyboardVerticalOffset={PlatformIOS ? -130 : -140}
      >
        <View
          style={tw.style(
            `max-h-[${MODAL_HEIGHT}px] ${
              animationIn !== 'fadeIn' ? 'shadow-2xl' : ''
            } rounded-2xl bg-stone-100`
          )}
        >
          <SwipeHeader
            title={title}
            closeModal={closeModal}
            animationIn={animationIn}
          />

          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
}
