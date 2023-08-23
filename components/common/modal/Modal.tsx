import { ReactNode } from 'react';
import { Dimensions, SafeAreaView, StyleProp, View } from 'react-native';
import Modal from 'react-native-modal';
import SwipeHeader from './SwipeHeader';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  children: ReactNode;
  title?: string;
  swipe?: boolean;
  style?: StyleProp<any>;
  bgColor?: string;
  animationIn?: 'fadeIn' | 'slideInUp';
  animationOut?: 'fadeOut' | 'slideOutDown';
}

export default function RNModal({
  swipe,
  style,
  title,
  bgColor = 'bg-stone-100',
  children,
  modalVisible,
  setModalVisible,
  animationIn = 'slideInUp',
  animationOut = 'slideOutDown',
}: Props) {
  const MODAL_HEIGHT = Dimensions.get('screen').height * 0.85;

  const closeModal = () => setModalVisible(false);

  return (
    <Modal
      swipeDirection={swipe ? ['down'] : undefined}
      onSwipeComplete={closeModal}
      propagateSwipe={true}
      animationIn={animationIn}
      animationOut={animationOut}
      statusBarTranslucent={true}
      onBackdropPress={closeModal}
      isVisible={modalVisible}
      style={tw.style(`m-0 justify-end`, style)}
    >
      <SafeAreaView style={tw`justify-end`}>
        <View style={tw`${bgColor} rounded-2xl max-h-[${MODAL_HEIGHT}px]`}>
          {animationIn === 'slideInUp' && (
            <SwipeHeader title={title} closeModal={closeModal} />
          )}
          <View style={tw`p-4`}>{children}</View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
