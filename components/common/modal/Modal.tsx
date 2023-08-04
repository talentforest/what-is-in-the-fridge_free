import { ReactNode } from 'react';
import { Dimensions, SafeAreaView, StyleProp, View } from 'react-native';
import Modal from 'react-native-modal';
import Header from './Header';
import tw from 'twrnc';

interface Props {
  style?: StyleProp<any>;
  title?: string;
  bgColor?: string;
  children: ReactNode;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function RNModal({
  style,
  title,
  bgColor = 'bg-blue-50',
  children,
  modalVisible,
  setModalVisible,
}: Props) {
  const MODAL_HEIGHT = Dimensions.get('screen').height * 0.85;

  const closeModal = () => setModalVisible(false);

  return (
    <Modal
      statusBarTranslucent={true}
      onBackdropPress={closeModal}
      isVisible={modalVisible}
      style={tw.style(`m-0 justify-end`, style)}
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
