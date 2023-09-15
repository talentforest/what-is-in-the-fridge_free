import { ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleProp,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeBottomAreaView } from '../common/native-component';
import { DEVICE_HEIGHT } from '../../util';
import { PlatformIOS } from '../../constant/statusBarHeight';

import RNModal from 'react-native-modal';
import SwipeHeader from './SwipeHeader';
import tw from 'twrnc';

export type ModalTitle =
  | '장보기 목록 식료품 추가'
  | '새로운 식료품 추가'
  | '식료품 정보 수정'
  | '팬트리 식료품 추가'
  | '팬트리 식료품 수정';

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
  const MODAL_HEIGHT = DEVICE_HEIGHT * 0.85;

  const closeModal = () => setModalVisible(false);

  const centerStyle = animationIn === 'fadeIn' ? 'justify-center mx-4' : '';
  const bgColor =
    title === '식료품 상세 정보'
      ? 'bg-white'
      : title === '팬트리 식료품 추가'
      ? 'bg-stone-100'
      : animationIn === 'fadeIn'
      ? 'bg-stone-200'
      : 'bg-stone-100';

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
      style={tw.style(`m-0 justify-end ${centerStyle}`, style)}
      hasBackdrop={hasBackdrop}
      backdropOpacity={0.6}
    >
      <KeyboardAvoidingView
        behavior={PlatformIOS ? 'padding' : 'height'}
        keyboardVerticalOffset={PlatformIOS ? -125 : 0}
      >
        <SafeAreaView
          style={tw.style(
            `${
              animationIn === 'fadeIn' ? 'rounded-2xl' : `rounded-t-2xl`
            } ${bgColor}`,
            Platform.select({
              ios: {
                shadowColor: '#333',
                shadowOpacity: 0.4,
                shadowOffset: { height: -3, width: 0 },
                shadowRadius: 14,
              },
              android: {
                elevation: 50,
              },
            })
          )}
        >
          <SafeBottomAreaView
            style={tw`justify-end ${
              animationIn === 'fadeIn' ? '' : 'border border-b-0 pb-4'
            }  rounded-t-2xl border-slate-300 max-h-[${MODAL_HEIGHT}px] `}
          >
            {animationIn !== 'fadeIn' && (
              <SwipeHeader title={title} closeModal={closeModal} />
            )}
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View>{children}</View>
            </TouchableWithoutFeedback>
          </SafeBottomAreaView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </RNModal>
  );
}
