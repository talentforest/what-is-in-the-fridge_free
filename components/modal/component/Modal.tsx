import { ReactNode } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import tw from 'twrnc';
import Header from './Header';

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
  return (
    <Modal
      onBackdropPress={() => setModalVisible(false)}
      isVisible={modalVisible}
      style={tw`justify-end m-0 border`}
    >
      <View style={tw`bg-indigo-300 p-4 pb-8 rounded-t-2xl`}>
        <Header title={title} setModalVisible={setModalVisible} />
        {children}
      </View>
    </Modal>
  );
}
