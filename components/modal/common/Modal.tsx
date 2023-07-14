import { ReactNode } from 'react';
import { SafeAreaView, View } from 'react-native';
import Modal from 'react-native-modal';
import Header from './Header';
import tw from 'twrnc';
import { SafeBottomAreaView } from '../../native-component';

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
      <SafeAreaView>
        <View style={tw`bg-white p-4 rounded-2xl `}>
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
