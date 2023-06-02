import { Platform, StatusBar, View } from 'react-native';
import { Text } from '../components/native-component';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import tw from 'twrnc';

export default function Setting() {
  const statusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

  return (
    <View
      style={tw`flex-1 px-4 pb-2 bg-neutral-50 gap-2 pt-[${
        (statusBarHeight || 0) + 14
      }px]`}
    >
      <Text styletw='pb-2 text-lg text-slate-600'>설정</Text>
      <View style={tw`border p-2 rounded-lg`}>
        <Text>나의 냉장고 설정하기</Text>
      </View>

      <View>
        <Text styletw=''>식품 정보 카테고리 설정하기</Text>
      </View>

      <Text styletw='text-indigo-600'>데이터 관리</Text>
      <View>
        <Text>백업(데이터 내보내기)</Text>
      </View>
      <View>
        <Text>복원(데이터 가져오기)</Text>
      </View>

      <View>
        <Text>리뷰 남기기</Text>
      </View>

      <View>
        <Text>공지사항</Text>
      </View>

      <View>
        <Text>현재버전</Text>
      </View>
    </View>
  );
}
