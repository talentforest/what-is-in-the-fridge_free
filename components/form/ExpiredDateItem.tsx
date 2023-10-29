import { View } from 'react-native';
import { Text, TextInput, TouchableOpacity } from '../common/native-component';
import {
  getColorByLeftDay,
  getDiffDate,
  getFormattedDate,
  getRelativeTime,
  getTWColorByLeftDay,
} from '../../util';
import { BLUE } from '../../constant/colors';
import { controlDateBtns } from '../../constant/controlDateBtns';
import { shadowStyle } from '../../constant/shadowStyle';
import { useDispatch, useSelector } from '../../redux/hook';
import { toggleExpiredDateModal } from '../../redux/slice/formModalSlice';

import Icon from '../common/native-component/Icon';
import FormLabel from './FormLabel';
import ControlDateBtn from '../buttons/ControlDateBtn';
import DateNumInputModal from '../../screen-component/modal/DateNumInputModal';
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
      <View style={tw`mb-3`}>
        <FormLabel label='소비기한' />

        <TouchableOpacity
          onPress={() => dispatch(toggleExpiredDateModal(true))}
          style={tw.style(
            `h-11 border border-slate-300 bg-white rounded-lg flex-row items-center justify-between px-2`,
            shadowStyle(3)
          )}
        >
          <View style={tw`flex-row gap-2 items-center`}>
            <TextInput
              value={getFormattedDate(date, 'YY.MM.DD')}
              editable={false}
              pointerEvents='none'
              style={tw`border-0 pl-0 my-0 py-0 px-0 mr-1 text-slate-900`}
            />
            <View style={tw` flex-row items-center`}>
              {getDiffDate(date) >= 2 && (
                <Icon
                  name='plus'
                  type='MaterialCommunityIcons'
                  size={16}
                  color={getColorByLeftDay(date)}
                />
              )}
              <Text style={tw`text-sm ${getTWColorByLeftDay(date)}`}>
                {getRelativeTime(date)}까지
              </Text>
            </View>
          </View>

          <View style={tw`h-full items-center justify-center pl-5 pr-1`}>
            <Icon type='Feather' name='calendar' size={18} color={BLUE} />
          </View>
        </TouchableOpacity>

        <View style={tw`mt-2 gap-1 flex-row flex-wrap items-start`}>
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
