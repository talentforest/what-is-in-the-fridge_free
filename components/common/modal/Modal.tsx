import { ReactNode } from 'react';
import {
  Dimensions,
  Keyboard,
  SafeAreaView,
  StyleProp,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { PlatformIOS } from '../../../constant/statusBarHeight';

import RNModal from 'react-native-modal';
import SwipeHeader from './SwipeHeader';
import tw from 'twrnc';

export type ModalTitle =
  | '장보기 목록 식료품 추가'
  | '새로운 식료품 추가'
  | '식료품 정보 수정';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  title?: string;
  children: ReactNode;
  style?: StyleProp<any>;
  animationIn?: 'fadeIn' | 'slideInUp';
  animationOut?: 'fadeOut' | 'slideOutDown';
  hasBackdrop?: boolean;
}

export default function Modal({
  style,
  title,
  children,
  modalVisible,
  setModalVisible,
  animationIn = 'slideInUp',
  animationOut = 'slideOutDown',
  hasBackdrop = false,
}: Props) {
  const MODAL_HEIGHT = Dimensions.get('screen').height * 0.85;
  const MODAL_BORDER_RADIUS =
    PlatformIOS || animationIn === 'fadeIn' ? 'rounded-2xl' : 'rounded-t-2xl';

  const closeModal = () => setModalVisible(false);

  return (
    <RNModal
      isVisible={modalVisible}
      onBackdropPress={closeModal}
      swipeDirection={['down']}
      onSwipeComplete={closeModal}
      propagateSwipe={true}
      animationIn={animationIn}
      animationOut={animationOut}
      statusBarTranslucent={true}
      style={tw.style(`m-0 justify-end`, style)}
      hasBackdrop={hasBackdrop}
      backdropOpacity={0.6}
    >
      <SafeAreaView
        style={tw`bg-white justify-end pb-4 border border-gray-500 shadow-lg max-h-[${MODAL_HEIGHT}px] ${MODAL_BORDER_RADIUS}`}
      >
        {animationIn !== 'fadeIn' && (
          <SwipeHeader title={title} closeModal={closeModal} />
        )}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>{children}</View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </RNModal>
  );
}
