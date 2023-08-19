import { ReactNode } from 'react';
import { Dimensions, SafeAreaView, StyleProp, View } from 'react-native';
import Modal from 'react-native-modal';
import SwipeHeader from './SwipeHeader';
import tw from 'twrnc';

interface Props {
  style?: StyleProp<any>;
  title?: string;
  bgColor?: string;
  children: ReactNode;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  animationIn?: 'fadeIn' | 'slideInUp';
  animationOut?: 'fadeOut' | 'slideOutDown';
}

export default function RNModal({
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
      swipeDirection={'down'}
      onSwipeComplete={closeModal}
      animationIn={animationIn}
      animationOut={animationOut}
      statusBarTranslucent={true}
      onBackdropPress={closeModal}
      isVisible={modalVisible}
      style={tw.style(`m-0 justify-end`, style)}
      propagateSwipe={true}
      hideModalContentWhileAnimating={true}
    >
      <SafeAreaView style={tw`justify-end`}>
        <View style={tw`${bgColor} rounded-2xl max-h-[${MODAL_HEIGHT}px]`}>
          {animationIn === 'slideInUp' && <SwipeHeader title={title} />}
          <View style={tw`p-4`}>{children}</View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
