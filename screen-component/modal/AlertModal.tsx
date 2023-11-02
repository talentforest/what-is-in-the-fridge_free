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
    <Modal
      title='알림'
      isVisible={alertModalVisible}
      closeModal={closeModal}
      animationIn='fadeIn'
    >
      <View
        style={tw.style(
          `min-h-35 justify-between bg-white border-2 border-slate-600 rounded-lg pt-4 pb-3 px-4 mx-7`,
          alertModalVisible ? shadowStyle(5) : {}
        )}
      >
        <View>
          <Text style={tw`text-xl text-slate-900`}>{title}</Text>
          <View style={tw`h-0.5 bg-slate-800 rounded-full mt-0.5 mb-2`} />
        </View>
        <Text style={tw.style(`text-slate-600`, { lineHeight: 24 })}>
          {msg}
        </Text>

        <View style={tw`flex-row self-end gap-1 mt-2`}>
          {btns.map((btn) => (
            <TouchableOpacity
              key={btn}
              onPress={() => onBtnPress(btn)}
              style={tw`py-0.5 px-2.5 border-2 border-slate-600 bg-white rounded-full`}
            >
              <Text
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
    </Modal>
  );
}
