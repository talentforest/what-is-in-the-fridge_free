import { closeKeyboard, isValidDate } from '../../util';
import { Animated, View, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { useItemSlideAnimation } from '../../hooks';
import { useDispatch, useSelector } from '../../redux/hook';
import { editFormFood } from '../../redux/slice/food/formFoodSlice';
import { showExpiredDateModal } from '../../redux/slice/modalVisibleSlice';
import { Text } from '../../components/common/native-component';

import DateNumTokenBox from '../../components/common/DateNumTokenBox';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import FadeInMiddleModal from '../../components/modal/FadeInMiddleModal';
import tw from 'twrnc';

export type DateType = '년' | '월' | '일';

export type DateState = {
  state: 'ok' | 'error';
  msg: string;
};

const initialDateToken = ['', '', '', '', '', ''];

const initialMsg: DateState = {
  state: 'ok',
  msg: '',
};

export default function DateNumInputModal() {
  const [dateToken, setDateToken] = useState(initialDateToken);
  const [inValidDate, setInValidDate] = useState<DateState>(initialMsg);
  const { expiredDateModal } = useSelector((state) => state.modalVisible);

  const dispatch = useDispatch();

  const { height: windowDimensionHeight, width } = useWindowDimensions();

  const tokenWidth = width > 400 ? width / 12 : width / 10;

  const { height } = useItemSlideAnimation({
    initialValue: 0,
    toValue: 28,
    active: inValidDate.state === 'error',
  });

  const year = `${dateToken[0]}${dateToken[1]}`;
  const month = `${dateToken[2]}${dateToken[3]}`;
  const day = `${dateToken[4]}${dateToken[5]}`;
  const convertTokenToDate = `20${year}-${month}-${day}`;

  const isValid = isValidDate(convertTokenToDate);

  const closeModal = () => {
    closeKeyboard();
    dispatch(showExpiredDateModal(false));
    setDateToken(initialDateToken);
    setInValidDate(initialMsg);
  };

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
      isVisible={expiredDateModal}
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
            marginTop: 5,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={tw`text-red-500 flex-1`}>{inValidDate.msg}</Text>
        </Animated.View>

        <View style={tw`w-full`}>
          <SubmitBtn onPress={onSubmit} iconName='check' btnName='설정 완료' />
        </View>
      </View>
    </FadeInMiddleModal>
  );
}
