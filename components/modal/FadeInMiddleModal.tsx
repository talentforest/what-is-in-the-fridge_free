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
  | '알림'
  | `${CompartmentNum}칸 크게 보기`
  | '카테고리 선택'
  | '소비기한 설정'
  | '한번에 추가할 공간'
  | '추가할 식료품 정보';

interface Props {
  isVisible: boolean;
  children: ReactNode;
  title: ModalTitle;
  closeModal?: () => void;
  style?: StyleProp<any>;
}

export default function FadeInMiddleModal({
  style,
  title,
  children,
  isVisible,
  closeModal,
}: Props) {
  const { height } = useWindowDimensions();

  const positionStyle = height > 900 ? 'w-4/5 self-center' : 'mx-4';

  const modalBorderColor = 'border-slate-300 border';

  const MODAL_HEIGHT = height * 0.8;

  return (
    <RNModal
      isVisible={isVisible}
      onBackdropPress={title === '알림' ? undefined : closeModal}
      backdropTransitionOutTiming={0} // 안드로이드 깜박임 이슈
      onBackButtonPress={closeModal} // 안드로이드 뒤로 가기 버튼
      onSwipeComplete={closeModal}
      propagateSwipe={true}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationInTiming={title === '알림' ? 100 : 600}
      animationOutTiming={title === '알림' ? 100 : 200}
      deviceHeight={height * 1.2}
      statusBarTranslucent={true}
      hasBackdrop={true}
      backdropOpacity={title === '알림' ? 0.2 : 0.6}
      style={tw.style(`m-0 ${positionStyle}`, style)}
    >
      {title === '알림' ? (
        <View>{children}</View>
      ) : (
        <View
          style={tw`max-h-[${MODAL_HEIGHT}px] p-4 rounded-3xl ${modalBorderColor} bg-slate-200`}
        >
          <SwipeHeader
            title={title}
            closeModal={closeModal}
            animationIn={'fadeIn'}
          />

          {/* 구분선 */}
          <View style={tw`${modalBorderColor} border-b -mx-4 px-4 mb-3`} />

          <TouchableWithoutFeedback onPress={closeKeyboard}>
            <View>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </RNModal>
  );
}
