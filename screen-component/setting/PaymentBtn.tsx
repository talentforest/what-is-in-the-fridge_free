import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { shadowStyle } from '../../constant/shadowStyle';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';
import { useSelector } from '../../redux/hook';
import { MAX_LIMIT } from '../../constant/foodInfo';

export default function PaymentBtn() {
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const allFoods = [...fridgeFoods, ...pantryFoods];

  return (
    <TouchableOpacity
      onPress={() => console.log('인앱 결제 설정하기')}
      style={tw.style(
        `bg-blue-50 border border-blue-200 flex-row items-center justify-between py-3 px-4 rounded-2xl`,
        shadowStyle(3)
      )}
    >
      <View style={tw`flex-row items-center gap-3`}>
        <Icon name='unlock' type='Feather' size={22} />
        <View>
          <Text style={tw`text-blue-700 text-lg`}>식료품 개수 한도 해제</Text>
          <Text style={tw`text-base text-slate-600 -mt-1`}>
            {allFoods.length}/{MAX_LIMIT}
          </Text>
        </View>
      </View>

      <Text style={tw`text-lg`}>2,000원</Text>
    </TouchableOpacity>
  );
}
