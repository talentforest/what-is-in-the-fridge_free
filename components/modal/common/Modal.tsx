import { ReactNode } from 'react';
import { View } from 'react-native';
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
  return (
    <Modal
      onBackdropPress={() => {
        setModalVisible(false);
      }}
      isVisible={modalVisible}
      avoidKeyboard
      style={tw`m-0 justify-end`}
    >
      <View style={tw`bg-white p-4 pb-6 rounded-t-2xl max-h-[95%]`}>
        <Header
          title={title}
          setModalVisible={() => {
            setModalVisible(!modalVisible);
          }}
        />
        {children}
      </View>
    </Modal>
  );
}
