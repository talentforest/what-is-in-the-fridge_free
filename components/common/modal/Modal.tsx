import { ReactNode } from 'react';
import { Dimensions, SafeAreaView, View } from 'react-native';
import Modal from 'react-native-modal';
import Header from './Header';
import tw from 'twrnc';

interface Props {
  title?: string;
  bgColor?: string;
  children: ReactNode;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function RNModal({
  title,
  bgColor = 'bg-blue-50',
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
    >
      <SafeAreaView style={tw`justify-end`}>
        <View style={tw`${bgColor} p-4 rounded-2xl max-h-[${MODAL_HEIGHT}px]`}>
          {title && (
            <Header
              title={title}
              setModalVisible={() => {
                setModalVisible(!modalVisible);
              }}
            />
          )}
          {children}
        </View>
      </SafeAreaView>
    </Modal>
  );
}
