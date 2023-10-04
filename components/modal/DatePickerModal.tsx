import { ReactNode } from 'react';
import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { PlatformIOS } from '../../constant/statusBarHeight';
import { SCDream5 } from '../../constant/fonts';

import Modal from './Modal';
import tw from 'twrnc';

interface Props {
  isVisible: boolean;
  closeModal: () => void;
  positivePress: () => void;
  children: ReactNode;
}

export default function DatePickerModal({
  isVisible,
  closeModal,
  positivePress,
  children,
}: Props) {
  return (
    <Modal
      title='날짜 선택'
      isVisible={isVisible}
      closeModal={closeModal}
      hasBackdrop
      animationIn='fadeIn'
      style={tw`justify-end`}
    >
      <View style={tw`border mb-${PlatformIOS ? '12' : '6'} gap-2`}>
        <View style={tw`bg-white rounded-2xl`}>
          {children}
          <TouchableOpacity
            onPress={() => {
              positivePress();
              closeModal();
            }}
            style={tw`border-t border-slate-300 py-2.5 bg-white rounded-2xl`}
          >
            <Text
              style={tw.style(`text-lg text-center text-blue-600`, SCDream5)}
            >
              확인
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={closeModal}
          style={tw`py-3 bg-white rounded-2xl`}
        >
          <Text style={tw.style(`text-lg text-center text-red-500`, SCDream5)}>
            취소
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
