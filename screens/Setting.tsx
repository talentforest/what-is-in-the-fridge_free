import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../navigation/Navigation';
import SettingContainer from '../components/screen-component/setting/SettingContainer';
import SettingItem from '../components/screen-component/setting/SettingItem';
import Container from '../components/common/layout/Container';

export default function Setting() {
  const navigation = useNavigation<NavigateProp>();

  return (
    <Container>
      <SettingContainer title='냉장고 설정'>
        <SettingItem
          title='나의 냉장고 설정 변경'
          onPress={() => navigation.navigate('FridgeSetting')}
          iconName='fridge'
        />
      </SettingContainer>

      <SettingContainer title='기타'>
        <SettingItem
          title='의견 남기기'
          onPress={() => console.log('의견')}
          iconName='comment-edit'
        />
      </SettingContainer>
    </Container>
  );
}
