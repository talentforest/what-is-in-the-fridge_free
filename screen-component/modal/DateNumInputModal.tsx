import { DEVICE_HEIGHT, isValidDate } from '../../util';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { shadowStyle } from '../../constant/shadowStyle';
import { Animated, View } from 'react-native';
import { useState } from 'react';
import { useSlideAnimation } from '../../hooks';
import DateNumTokenBox from '../../components/common/DateNumTokenBox';
import Modal from '../../components/modal/Modal';
import Icon from '../../components/common/native-component/Icon';
import MessageBox from '../../components/common/MessageBox';
import tw from 'twrnc';

export type DateType = '년' | '월' | '일';

interface Props {
  closeModal: () => void;
  isVisible: boolean;
  expiredDate: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export type DateState = {
  state: 'ok' | 'error';
  msg: string;
};

export default function DateNumInputModal({
  closeModal,
  isVisible,
  expiredDate,
  changeInfo,
}: Props) {
  const [dateToken, setDateToken] = useState(['', '', '', '', '', '']);
  const [inValidDate, setInValidDate] = useState<DateState>({
    state: 'ok',
    msg: '',
  });

  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: 28,
    active: inValidDate.state === 'error',
  });

  const year = `${dateToken[0]}${dateToken[1]}`;
  const month = `${dateToken[2]}${dateToken[3]}`;
  const day = `${dateToken[4]}${dateToken[5]}`;
  const convertTokenToDate = `20${year}-${month}-${day}`;

  const isValid = isValidDate(convertTokenToDate);

  return (
    <Modal
      title='소비기한 설정'
      isVisible={isVisible}
      closeModal={closeModal}
      animationIn='fadeIn'
    >
      <View
        style={tw`bg-white h-[${DEVICE_HEIGHT * 0.25}px] 
        rounded-b-xl gap-2 px-4 py-7 items-center justify-center`}
      >
        <View style={tw`flex-row gap-2 w-full items-center justify-center`}>
          <DateNumTokenBox
            expiredDate={expiredDate}
            dateToken={dateToken}
            setDateToken={setDateToken}
            setInValidDate={setInValidDate}
          />
        </View>

        <Animated.View
          style={{
            height,
            overflow: 'hidden',
            marginTop: 10,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <MessageBox color='red' message={inValidDate.msg} />
        </Animated.View>

        <TouchableOpacity
          onPress={() => {
            if (isValid.state === 'error') {
              setInValidDate({ state: 'error', msg: isValid.msg });
              return;
            }
            changeInfo({ expiredDate: convertTokenToDate });
            closeModal();
          }}
          style={tw.style(
            `bg-blue-600 h-10 w-full flex-row items-center justify-center gap-1.5 rounded-lg`,
            shadowStyle(3)
          )}
        >
          <Icon
            name='check-circle-outline'
            type='MaterialCommunityIcons'
            color='#fff'
            size={17}
          />
          <Text style={tw`text-white text-[15px] text-center pt-0.8`}>
            설정 완료
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
