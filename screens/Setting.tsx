import { View } from 'react-native';
import Container from '../components/common/Container';
import SettingBox, {
  SettingInfo,
} from '../screen-component/setting/SettingBox';
import { Text } from '../components/common/native-component';
import { LIGHT_BLUE } from '../constant/colors';
import { shadowStyle } from '../constant/shadowStyle';

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
    { title: '폰트 설정', navigate: 'FontSetting', icon: 'cellphone-text' },
    { title: '알림', navigate: '', icon: 'bell' },
    { title: '버전', navigate: '', icon: 'versions' },
  ];

  return (
    <Container>
      <View
        style={tw.style(
          `border border-blue-100 bg-white rounded-xl py-4 px-3.5 mb-4`,
          shadowStyle(4)
        )}
      >
        <View style={tw`flex-row items-center gap-1 mb-1.5`}>
          <Icon
            name='credit-card'
            type='MaterialCommunityIcons'
            color={LIGHT_BLUE}
            size={21}
          />
          <Text fontSize={18}>이용권 구매</Text>
        </View>
        <Text fontSize={15} style={tw`text-slate-600 mb-2 leading-4`}>
          이용권을 한번만 구매하면 식료품을 계속 무제한으로 저장할 수 있어요.
        </Text>

        {/* 결제 버튼 */}
        <PaymentBtn />
      </View>

      <View style={tw`gap-1 px-1 mt-2`}>
        {settings.map((setting) => (
          <SettingBox key={setting.title} setting={setting} />
        ))}
      </View>
    </Container>
  );
}
