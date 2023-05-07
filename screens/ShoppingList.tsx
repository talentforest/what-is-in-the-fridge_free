import { ScrollView } from 'react-native';
import { Text } from '../components/native-component';
import tw from 'twrnc';

export default function ShoppingList() {
  return (
    <ScrollView style={tw`bg-indigo-50 px-4 pb-80 pt-4`}>
      {
        <Text styletw='text-center mt-40 text-base text-indigo-600'>
          장보기 정보가 없습니다.
        </Text>
      }
    </ScrollView>
  );
}
