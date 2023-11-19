import { isValidDate } from '../../util';
import { Animated, View, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { useSlideAnimation } from '../../hooks';

import DateNumTokenBox from '../../components/common/DateNumTokenBox';
import MessageBox from '../../components/common/MessageBox';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import tw from 'twrnc';
import FadeInMiddleModal from '../../components/modal/FadeInMiddleModal';
import { useDispatch } from '../../redux/hook';
import { editFormFood } from '../../redux/slice/formFoodSlice';

export type DateType = '년' | '월' | '일';

interface Props {
  closeModal: () => void;
  isVisible: boolean;
}

export type DateState = {
  state: 'ok' | 'error';
  msg: string;
};

export default function DateNumInputModal({ closeModal, isVisible }: Props) {
  const [dateToken, setDateToken] = useState(['', '', '', '', '', '']);
  const [inValidDate, setInValidDate] = useState<DateState>({
    state: 'ok',
    msg: '',
  });

  const dispatch = useDispatch();

  const { height: windowDimensionHeight, width } = useWindowDimensions();

  const tokenWidth = width > 400 ? width / 12 : width / 10;

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
    dispatch(editFormFood({ expiredDate: convertTokenToDate }));
    closeModal();
  };

  return (
    <FadeInMiddleModal
      title='소비기한 설정'
      isVisible={isVisible}
      closeModal={closeModal}
      style={tw`justify-start mt-28`}
    >
      <View style={tw`h-[${windowDimensionHeight * 0.2}px] `}>
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
          <SubmitBtn onPress={onSubmit} iconName='check' btnName='설정 완료' />
        </View>
      </View>
    </FadeInMiddleModal>
  );
}
