import { View } from 'react-native';
import { useDispatch, useSelector } from '../../redux/hook';
import { AlertBtns, toggleAlertModal } from '../../redux/slice/alertModalSlice';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { shadowStyle } from '../../constant/shadowStyle';

import Modal from '../../components/modal/Modal';
import tw from 'twrnc';
import FadeInMiddleModal from '../../components/modal/FadeInMiddleModal';

interface Props {
  onPress?: () => void;
}

export default function AlertModal({ onPress }: Props) {
  const {
    alertModalVisible,
    alertInfo: { title, msg, btns },
  } = useSelector((state) => state.alertModal);

  const dispatch = useDispatch();

  const closeModal = () => dispatch(toggleAlertModal(false));

  const onBtnPress = (btn: AlertBtns) => {
    if (btn === '취소') return closeModal();
    onPress && onPress();
  };

  return (
    <FadeInMiddleModal
      title='알림'
      isVisible={alertModalVisible}
      closeModal={closeModal}
    >
      <View
        style={tw.style(
          `justify-between bg-white border-2 border-slate-600 rounded-md py-2.5 px-4 mx-7`,
          alertModalVisible ? shadowStyle(5) : {}
        )}
      >
        <View>
          <Text fontSize={18} style={tw`text-slate-900`}>
            {title}
          </Text>
          <View style={tw`h-0.5 bg-slate-800 rounded-full mt-1.5 mb-2`} />
        </View>
        <Text
          style={tw.style(`text-slate-600 mb-1`, {
            lineHeight: 24,
          })}
        >
          {msg}
        </Text>

        <View style={tw`flex-row self-end gap-1 mt-2`}>
          {btns.map((btn) => (
            <TouchableOpacity
              key={btn}
              onPress={() => onBtnPress(btn)}
              style={tw`py-1 px-2.5 border-2 border-slate-600 bg-white rounded-full`}
            >
              <Text
                fontSize={16}
                style={tw`${
                  btn === '취소' ? 'text-slate-500' : 'text-blue-600'
                }`}
              >
                {btn}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </FadeInMiddleModal>
  );
}
