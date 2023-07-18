import { ReactNode } from 'react';
import { Dimensions, SafeAreaView, View } from 'react-native';
import Modal from 'react-native-modal';
import Header from './Header';
import tw from 'twrnc';

interface Props {
  title: string;
  children: ReactNode;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function RNModal({
  title,
  children,
  modalVisible,
  setModalVisible,
}: Props) {
  const MODAL_HEIGHT = Dimensions.get('screen').height * 0.85;

  return (
    <Modal
      statusBarTranslucent={true}
      onBackdropPress={() => setModalVisible(false)}
      isVisible={modalVisible}
      style={tw`m-0 justify-end`}
      swipeDirection={['down']}
      onSwipeComplete={() => setModalVisible(false)}
    >
      <SafeAreaView style={tw`justify-end`}>
        <View style={tw`bg-white p-4 rounded-2xl max-h-[${MODAL_HEIGHT}px]`}>
          <Header
            title={title}
            setModalVisible={() => {
              setModalVisible(!modalVisible);
            }}
          />
          {children}
        </View>
      </SafeAreaView>
    </Modal>
  );
}
