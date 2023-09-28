import { ReactNode } from 'react';
import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { PlatformIOS } from '../../constant/statusBarHeight';

import Modal from './Modal';
import tw from 'twrnc';

interface Props {
  isVisible: boolean;
  closeModal: () => void;
  changeInfo: () => void;
  children: ReactNode;
}

export default function DatePickerModal({
  isVisible,
  closeModal,
  changeInfo,
  children,
}: Props) {
  return (
    <Modal isVisible={isVisible} closeModal={closeModal}>
      <View style={tw`gap-2`}>
        <View style={tw`bg-white rounded-2xl`}>
          {children}
          <TouchableOpacity
            onPress={() => {
              changeInfo();
              closeModal();
            }}
            style={tw`border-t border-slate-300 py-2.5 bg-white rounded-2xl`}
          >
            <Text
              style={tw.style(`text-xl font-bold text-center text-blue-500`, {
                fontFamily: PlatformIOS ? 'Arial' : 'Roboto',
              })}
            >
              확인
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={closeModal}
          style={tw`py-3 bg-white rounded-t-2xl rounded-b-3xl`}
        >
          <Text
            style={tw.style(`text-xl text-center text-red-500`, {
              fontFamily: PlatformIOS ? 'Arial' : 'Roboto',
            })}
          >
            취소
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
