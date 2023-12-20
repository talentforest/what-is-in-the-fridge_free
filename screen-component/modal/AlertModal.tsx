import { View } from 'react-native';
import { useSelector } from '../../redux/hook';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { shadowStyle } from '../../constant/shadowStyle';
import { BLUE } from '../../constant/colors';
import { useHandleAlert } from '../../hooks';

import FadeInMiddleModal from '../../components/modal/FadeInMiddleModal';
import IconChevronRight from '../../components/svg/arrow/IconChevronRight';
import tw from 'twrnc';

export default function AlertModal() {
  const {
    alertModalVisible,
    alertInfo: { title, msg, btns },
  } = useSelector((state) => state.alertModal);

  const { onAlertBtnPress, closeAlertModal } = useHandleAlert();

  return (
    <FadeInMiddleModal
      title='알림'
      isVisible={alertModalVisible}
      closeModal={closeAlertModal}
    >
      <View
        style={tw.style(
          `justify-between bg-white border-2 border-slate-200 rounded-lg py-2.5 px-4 mx-7`,
          alertModalVisible ? shadowStyle(5) : {}
        )}
      >
        <View>
          <Text fontSize={18} style={tw`text-slate-700 mt-0.5`}>
            {title}
          </Text>
          <View style={tw`h-0.3 bg-slate-300 rounded-full mt-1.5 mb-2`} />
        </View>
        <Text style={tw.style(`text-slate-600 mb-1 leading-5`)}>{msg}</Text>

        <View style={tw`flex-row self-end gap-1 mt-5`}>
          {btns.map((btn) => (
            <TouchableOpacity
              key={btn}
              onPress={() => onAlertBtnPress(title, btn)}
              style={tw.style(
                `py-1.5 px-3 flex-row items-center border-2 rounded-full bg-white
              ${
                btn === '취소' || btn === '닫기'
                  ? 'border-slate-100'
                  : 'border-blue-100 bg-blue-100'
              }`,
                shadowStyle(3)
              )}
            >
              <Text
                fontSize={16}
                style={tw`${
                  btn === '취소' || btn === '닫기'
                    ? 'text-slate-600'
                    : 'text-blue-700'
                }`}
              >
                {btn}
              </Text>

              {btn === '이용권 구매하러 가기' ? (
                <View style={tw`-mr-1`}>
                  <IconChevronRight size={16} color={BLUE} />
                </View>
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </FadeInMiddleModal>
  );
}
