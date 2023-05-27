import { ReactNode } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import tw from 'twrnc';
import Header from './Header';
import { useDispatch } from '../../../redux/hook';
import { search } from '../../../redux/slice/searchKeywordSlice';

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
  const dispatch = useDispatch();
  return (
    <Modal
      onBackdropPress={() => {
        setModalVisible(!modalVisible);
        dispatch(search(''));
      }}
      isVisible={modalVisible}
      style={tw`justify-end m-0`}
    >
      <View style={tw`bg-white p-4 pb-10 rounded-t-2xl`}>
        <Header
          title={title}
          setModalVisible={() => {
            setModalVisible(!modalVisible);
            dispatch(search(''));
          }}
        />
        {children}
      </View>
    </Modal>
  );
}
