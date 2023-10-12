import { ReactNode } from 'react';
import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { SCDream5 } from '../../constant/fonts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Modal from '../../components/modal/Modal';
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
  const insets = useSafeAreaInsets();

  return (
    <Modal
      title='구매날짜 설정'
      isVisible={isVisible}
      closeModal={closeModal}
      hasBackdrop
      animationIn='fadeIn'
      style={tw`justify-end`}
    >
      <View style={{ paddingBottom: insets?.bottom + 12 }}>
        <View style={tw`bg-white  rounded-b-2xl mb-1.5`}>
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

        <View style={tw`py-3 bg-white rounded-2xl`}>
          <TouchableOpacity onPress={closeModal}>
            <Text
              style={tw.style(`text-lg text-center text-red-500`, SCDream5)}
            >
              취소
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
