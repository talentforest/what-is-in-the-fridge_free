import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { shadowStyle } from '../../constant/shadowStyle';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

export default function PaymentBtn() {
  return (
    <TouchableOpacity
      onPress={() => console.log('인앱 결제 설정하기')}
      style={tw.style(
        `bg-blue-50 border border-blue-200 flex-row items-center justify-between py-3 px-4 rounded-2xl`,
        shadowStyle(3)
      )}
    >
      <View style={tw`flex-row items-center gap-1.5`}>
        <Icon name='unlock' type='Feather' size={18} />
        <Text style={tw`text-blue-700`}>식료품 개수 제한 해제</Text>
      </View>
      <Text style={tw`text-slate-900`}>2,000원</Text>
    </TouchableOpacity>
  );
}
