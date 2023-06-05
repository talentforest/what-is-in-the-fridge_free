import { Platform, StatusBar, View } from 'react-native';
import { Text } from '../components/native-component';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../navigation/Navigation';
import SettingContainer from '../components/screen-component/setting/SettingContainer';
import SettingItem from '../components/screen-component/setting/SettingItem';
import tw from 'twrnc';

export default function Setting() {
  const statusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

  const navigation = useNavigation<NavigateProp>();

  return (
    <View
      style={tw`flex-1 px-4 pb-2 bg-neutral-50 pt-[${
        (statusBarHeight || 0) + 14
      }px]`}
    >
      <Text styletw='pb-2 text-lg text-slate-600'>설정</Text>

      <SettingContainer title='냉장고 설정'>
        <SettingItem
          title='나의 냉장고 설정 변경'
          onPress={() => navigation.navigate('FridgeSetting')}
          iconName='fridge-outline'
        />
        <SettingItem
          title='식품 정보 입력 설정'
          onPress={() => console.log('설정')}
          iconName='text-box-check-outline'
        />
      </SettingContainer>

      <SettingContainer title='데이터 관리'>
        <SettingItem
          title='백업 (데이터 내보내기)'
          onPress={() => console.log('백업')}
          iconName='export-variant'
        />
        <SettingItem
          title='복원 (데이터 가져오기)'
          onPress={() => console.log('복원')}
          iconName='restore'
        />
      </SettingContainer>

      <SettingContainer title='기타'>
        <SettingItem
          title='테마'
          onPress={() => console.log('테마')}
          iconName='theme-light-dark'
        >
          <Text>라이트 모드</Text>
        </SettingItem>
        <SettingItem
          title='현재버전'
          onPress={() => console.log('현재버전')}
          disabled
          iconName='information-outline'
        >
          <Text>v 0.0.0</Text>
        </SettingItem>
      </SettingContainer>
    </View>
  );
}
