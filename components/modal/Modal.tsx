import { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';
import { closeKeyboard } from '../../util';

import RNModal from 'react-native-modal';
import SwipeHeader from './SwipeHeader';
import tw from 'twrnc';

export type ModalTitle =
  | '장보기 목록 식료품 추가'
  | '새로운 식료품 추가'
  | '식료품 정보 수정'
  | '식료품 상세 정보'
  | '카테고리별 필터링'
  | '식료품 검색 결과';

interface Props {
  isVisible: boolean;
  closeModal: () => void;
  children: ReactNode;
  title: ModalTitle;
  style?: StyleProp<any>;
}

export default function Modal({
  style,
  title,
  children,
  isVisible,
  closeModal,
}: Props) {
  const { height } = useWindowDimensions();

  const MODAL_HEIGHT = height * 0.9;

  const modalBorderColor = 'border-slate-300 border';

  return (
    <RNModal
      avoidKeyboard={true}
      isVisible={isVisible}
      onBackdropPress={closeModal}
      backdropTransitionOutTiming={0} // 안드로이드 깜박임 이슈 해결
      onBackButtonPress={closeModal} // 안드로이드 뒤로 가기 버튼
      onSwipeComplete={closeModal}
      swipeDirection={['down']}
      propagateSwipe={true}
      animationInTiming={400}
      animationOutTiming={200}
      animationIn='slideInUp'
      animationOut='slideOutDown'
      deviceHeight={height}
      statusBarTranslucent={true}
      hasBackdrop={true}
      backdropOpacity={0.6}
      style={tw.style(`m-0 justify-end`, style)}
    >
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={-125}>
        <View
          style={tw`max-h-[${MODAL_HEIGHT}px] pb-4 rounded-t-3xl ${modalBorderColor} bg-stone-100`}
        >
          <SwipeHeader
            title={title}
            closeModal={closeModal}
            animationIn='slideInUp'
          />

          <TouchableWithoutFeedback onPress={closeKeyboard}>
            <View style={tw`px-4`}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
}
