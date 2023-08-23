import { ReactNode } from 'react';
import { Dimensions, SafeAreaView, StyleProp, View } from 'react-native';
import { PlatformIOS } from '../../../constant/statusBarHeight';
import Modal from 'react-native-modal';
import SwipeHeader from './SwipeHeader';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  title?: string;
  children: ReactNode;
  style?: StyleProp<any>;
  bgColor?: string;
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
      isVisible={modalVisible}
      onBackdropPress={closeModal}
      swipeDirection={['down']}
      onSwipeComplete={closeModal}
      propagateSwipe={true}
      animationIn={animationIn}
      animationOut={animationOut}
      statusBarTranslucent={true}
      style={tw.style(`m-0 justify-end`, style)}
    >
      <SafeAreaView style={tw`justify-end`}>
        <View
          style={tw`${bgColor} ${
            PlatformIOS || animationIn === 'fadeIn'
              ? 'rounded-2xl'
              : 'rounded-t-2xl'
          } max-h-[${MODAL_HEIGHT}px]`}
        >
          {animationIn === 'slideInUp' && (
            <SwipeHeader title={title} closeModal={closeModal} />
          )}
          <View style={tw`p-4`}>{children}</View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
