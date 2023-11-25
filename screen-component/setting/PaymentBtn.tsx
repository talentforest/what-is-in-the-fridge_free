import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { shadowStyle } from '../../constant/shadowStyle';
import { changeNoLimit } from '../../redux/slice/limitSlice';
import { useDispatch } from '../../redux/hook';

import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

const PaymentBtn = () => {
  const dispatch = useDispatch();

  const onBtnPress = () => {
    console.log('이용권 구매!');
    dispatch(changeNoLimit());
  };

  return (
    <>
      <TouchableOpacity
        onPress={onBtnPress}
        style={tw.style(
          `bg-blue-50 border border-blue-200 py-3.5 px-4 rounded-2xl`,
          shadowStyle(3)
        )}
      >
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center gap-2`}>
            <View style={tw`items-center`}>
              <Icon name='unlock' type='Octicons' size={20} />
            </View>
            <Text style={tw`text-blue-700`}>식료품 개수 한도 해제</Text>
          </View>

          <View style={tw`flex-row items-center`}>
            <Text
              style={tw.style(`text-sm`, { fontFamily: 'NanumSquareRoundEB' })}
            >
              ₩
            </Text>
            <Text> 2,000</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default PaymentBtn;
