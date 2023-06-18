import { Platform, StatusBar, View } from 'react-native';
import { Text } from '../components/native-component';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../navigation/Navigation';
import SettingContainer from '../components/screen-component/setting/SettingContainer';
import SettingItem from '../components/screen-component/setting/SettingItem';
import tw from 'twrnc';
import Header from '../components/common/Header';

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
      <Header title='설정' />

      <SettingContainer title='냉장고 설정'>
        <SettingItem
          title='나의 냉장고 설정 변경'
          onPress={() => navigation.navigate('FridgeSetting')}
          iconName='fridge-outline'
        />
      </SettingContainer>

      <SettingContainer title='기타'>
        <SettingItem
          title='의견 남기기'
          onPress={() => console.log('의견')}
          iconName='comment-edit-outline'
        />
      </SettingContainer>
    </View>
  );
}
