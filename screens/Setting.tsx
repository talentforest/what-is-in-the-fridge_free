import { View } from 'react-native';
import Container from '../components/common/Container';
import SettingBox, {
  SettingInfo,
} from '../screen-component/setting/SettingBox';
import { Text } from '../components/common/native-component';
import { LIGHT_BLUE } from '../constant/colors';
import PaymentBtn from '../screen-component/setting/PaymentBtn';
import Icon from '../components/common/native-component/Icon';
import tw from 'twrnc';

export default function Setting() {
  const settings: SettingInfo[] = [
    {
      title: '나의 냉장고 커스텀',
      navigate: 'FridgeSetting',
      icon: 'fridge-outline',
    },
    { title: '알림', navigate: '', icon: 'bell' },
    { title: '다크모드', navigate: '', icon: 'moon' },
    { title: '버전', navigate: '', icon: 'smartphone' },
  ];

  return (
    <Container>
      <View
        style={tw`border border-blue-200 bg-white rounded-xl p-3 px-4 mb-5`}
      >
        <View>
          <View style={tw`flex-row items-center gap-1 mb-0.5`}>
            <Icon
              name='credit-card'
              type='MaterialCommunityIcons'
              color={LIGHT_BLUE}
              size={20}
            />
            <Text>이용권 구매</Text>
          </View>

          <Text style={tw`text-base text-slate-500 mb-2`}>
            이용권 구매시 식료품 정보를 한도 없이 저장할 수 있어요.
          </Text>
        </View>

        <PaymentBtn />
      </View>

      <View style={tw`gap-4.5 px-1 mt-2`}>
        {settings.map((setting) => (
          <SettingBox key={setting.title} setting={setting} />
        ))}
      </View>
    </Container>
  );
}
