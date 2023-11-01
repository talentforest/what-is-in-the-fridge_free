import { DEVICE_HEIGHT, isValidDate } from '../../util';
import { Animated, View, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { useSlideAnimation } from '../../hooks';

import DateNumTokenBox from '../../components/common/DateNumTokenBox';
import Modal from '../../components/modal/Modal';
import MessageBox from '../../components/common/MessageBox';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import tw from 'twrnc';

export type DateType = '년' | '월' | '일';

interface Props {
  closeModal: () => void;
  isVisible: boolean;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export type DateState = {
  state: 'ok' | 'error';
  msg: string;
};

export default function DateNumInputModal({
  closeModal,
  isVisible,
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

  const onSubmit = () => {
    if (isValid.state === 'error') {
      setInValidDate({ state: 'error', msg: isValid.msg });
      return;
    }
    changeInfo({ expiredDate: convertTokenToDate });
    closeModal();
  };

  const { width } = useWindowDimensions();

  const tokenWidth = width > 390 ? width / 9 : width / 10;

  return (
    <Modal
      title='소비기한 설정'
      isVisible={isVisible}
      closeModal={closeModal}
      animationIn='fadeIn'
    >
      <View style={tw`bg-white h-[${DEVICE_HEIGHT * 0.24}px] rounded-b-xl p-4`}>
        <View style={tw`w-full flex-1 flex-row items-center justify-center`}>
          <DateNumTokenBox
            dateToken={dateToken}
            setDateToken={setDateToken}
            setInValidDate={setInValidDate}
            width={tokenWidth}
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

        <View style={tw`w-full`}>
          <SubmitBtn
            onPress={onSubmit}
            iconName='check-square'
            btnName='설정 완료'
          />
        </View>
      </View>
    </Modal>
  );
}
