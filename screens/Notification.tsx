import { ScrollView, View } from 'react-native';
import { SafeBottomAreaView, Text } from '../components/native-component';
import tw from 'twrnc';
import EmptyTag from '../components/common/EmptyTag';

export default function Notification() {
  return (
    <SafeBottomAreaView>
      <View style={tw`flex-1 bg-indigo-50 p-4 gap-1`}>
        <EmptyTag tagName='알림이 없습니다' />
      </View>
    </SafeBottomAreaView>
  );
}
