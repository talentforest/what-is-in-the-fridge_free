import { View } from 'react-native';
import {
  InputStyle,
  Text,
  TextInput,
  TouchableOpacity,
} from '../common/native-component';
import { getDiffDate, getFormattedDate } from '../../util';
import { BLUE } from '../../constant/colors';
import { controlDateBtns } from '../../constant/controlDateBtns';
import { shadowStyle } from '../../constant/shadowStyle';
import { useDispatch, useSelector } from '../../redux/hook';
import { toggleExpiredDateModal } from '../../redux/slice/formModalSlice';

import Icon from '../common/native-component/Icon';
import FormLabel from './FormLabel';
import ControlDateBtn from '../buttons/ControlDateBtn';
import DateNumInputModal from '../../screen-component/modal/DateNumInputModal';
import RelativeTime from '../common/RelativeTime';
import tw from 'twrnc';

interface Props {
  date: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function ExpiredDateItem({ date, changeInfo }: Props) {
  const { expiredDateModal } = useSelector((state) => state.formModalVisible);

  const dispatch = useDispatch();

  const changeDate = (newDate: Date | string) => {
    const expiredDate = getFormattedDate(newDate, 'YYYY-MM-DD');
    changeInfo({ expiredDate });
  };

  return (
    <View>
      <FormLabel label='소비기한' />

      <TouchableOpacity
        onPress={() => dispatch(toggleExpiredDateModal(true))}
        style={tw.style(
          `flex-row items-center ${InputStyle} p-0`,
          shadowStyle(3)
        )}
      >
        <TextInput
          editable={false}
          value={getFormattedDate(date, 'YY.MM.DD')}
          style={tw`border-0 w-22 h-full`}
        />

        {getDiffDate(date) >= 0 && <RelativeTime date={date} />}

        <View style={tw`absolute right-2.5`}>
          <Icon type='Octicons' name='calendar' size={14} color={BLUE} />
        </View>
      </TouchableOpacity>

      <View style={tw`mt-1.5 gap-1 flex-row flex-wrap items-start`}>
        {controlDateBtns.map((btn) => (
          <ControlDateBtn
            key={btn.label}
            btn={btn}
            changeDate={changeDate}
            date={date}
            type='add'
          />
        ))}
      </View>

      {/* 날짜 숫자 입력 모달 */}
      {expiredDateModal && (
        <DateNumInputModal
          isVisible={expiredDateModal}
          closeModal={() => dispatch(toggleExpiredDateModal(false))}
          changeInfo={changeInfo}
        />
      )}
    </View>
  );
}
