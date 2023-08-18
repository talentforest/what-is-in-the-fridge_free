import { ReactNode } from 'react';
import { Dimensions, SafeAreaView, StyleProp, View } from 'react-native';
import { Text } from '../../native-component';
import Modal from 'react-native-modal';
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
        <View
          style={tw`${bgColor} p-4 pt-2 rounded-2xl max-h-[${MODAL_HEIGHT}px]`}
        >
          {animationIn === 'slideInUp' && (
            <View
              style={tw`mb-5 bg-slate-400 w-12 self-center h-2 rounded-2xl`}
            />
          )}
          {title && (
            <Text style={tw`px-2 mb-2`} fontSize={18}>
              {title}
            </Text>
          )}
          {children}
        </View>
      </SafeAreaView>
    </Modal>
  );
}
