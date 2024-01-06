import { ReactNode } from 'react';
import {
  StyleProp,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';
import { CompartmentNum } from '../../constant/fridgeInfo';
import { closeKeyboard } from '../../util';

import RNModal from 'react-native-modal';
import SwipeHeader from './SwipeHeader';
import tw from 'twrnc';

export type ModalTitle =
  | '알림 시간'
  | '알림'
  | `${CompartmentNum}칸 크게 보기`
  | '카테고리 선택'
  | '소비기한 설정'
  | '구매날짜 설정'
  | '한번에 추가할 공간'
  | '추가할 식료품 정보'
  | '식료품 상세 정보'
  | '장보기 목록 식료품 추가'
  | '식료품 정보 수정'
  | '식료품 위치 수정'
  | '새로운 식료품 추가';

interface Props {
  isVisible: boolean;
  children: ReactNode;
  title: ModalTitle;
  closeModal?: () => void;
  style?: StyleProp<any>;
  onModalShow?: () => void;
}

export default function FadeInMiddleModal({
  style,
  title,
  children,
  isVisible,
  closeModal,
  onModalShow,
}: Props) {
  const { height } = useWindowDimensions();

  const positionStyle = height > 900 ? 'w-4/5 self-center' : 'mx-4';

  const modalBorderColor = 'border-slate-300 border';

  const MODAL_HEIGHT = height * 0.9;

  return (
    <RNModal
      onModalShow={onModalShow}
      isVisible={isVisible}
      onBackdropPress={title === '알림' ? undefined : closeModal}
      backdropTransitionOutTiming={0} // 안드로이드 깜박임 이슈
      onBackButtonPress={closeModal} // 안드로이드 뒤로 가기 버튼
      onSwipeComplete={closeModal}
      propagateSwipe={true}
      animationIn='fadeIn'
      animationOut='fadeOut'
      animationInTiming={title === '알림' ? 100 : 200}
      animationOutTiming={title === '알림' ? 100 : 200}
      deviceHeight={height * 1.2}
      statusBarTranslucent={true}
      hasBackdrop={true}
      backdropOpacity={title === '알림' ? 0.2 : 0.6}
      style={tw.style(`m-0 ${positionStyle}`, style)}
    >
      {title === '알림' || title === '알림 시간' ? (
        <View style={tw`${isVisible ? '' : 'opacity-0'}`}>{children}</View>
      ) : (
        <View
          style={tw`bg-slate-200 max-h-[${MODAL_HEIGHT}px] p-4 rounded-3xl ${modalBorderColor}`}
        >
          <SwipeHeader
            title={title}
            closeModal={closeModal}
            animationIn='fadeIn'
          />

          <View style={tw`${isVisible ? '' : 'opacity-0'}`}>
            {/* 구분선 */}
            <View style={tw`${modalBorderColor} border-b -mx-4 px-4 mb-3`} />

            <TouchableWithoutFeedback onPress={closeKeyboard}>
              <View>{children}</View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )}
    </RNModal>
  );
}
