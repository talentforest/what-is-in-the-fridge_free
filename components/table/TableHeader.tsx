import { View } from 'react-native';
import { Text } from '../common/native-component';
import { useRouteName } from '../../hooks/useRouteName';
import { GRAY } from '../../constant/colors';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

export default function TableHeader() {
  const { routeAllFoods } = useRouteName();
  return (
    <View style={tw`flex-row px-2.5 py-2 gap-2`}>
      <View style={tw`flex-row items-center gap-2 flex-1`}>
        <Icon name='list-unordered' type='Octicons' size={13} color={GRAY} />
        <Text fontSize={15} style={tw`flex-1 text-slate-500`}>
          식료품
        </Text>
      </View>

      <View style={tw`gap-2 flex-row`}>
        {routeAllFoods && (
          <View style={tw`w-15`}>
            <Text fontSize={15} style={tw`text-slate-500`}>
              위치
            </Text>
          </View>
        )}
        <View style={tw`w-16 items-end`}>
          <Text fontSize={15} style={tw`text-slate-500`}>
            소비기한순
          </Text>
        </View>
      </View>
    </View>
  );
}
