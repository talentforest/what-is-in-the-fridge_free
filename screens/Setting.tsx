import { View } from 'react-native';
import Container from '../components/common/Container';
import SettingBox, {
  SettingInfo,
} from '../screen-component/setting/SettingBox';
import { Text } from '../components/common/native-component';
import { GRAY, LIGHT_BLUE } from '../constant/colors';

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
        style={tw`border border-blue-200 bg-white rounded-xl p-3 px-4 mb-5`}
      >
        <View>
          <View style={tw`flex-row items-center gap-1 mb-1`}>
            <Icon
              name='credit-card'
              type='MaterialCommunityIcons'
              color={LIGHT_BLUE}
              size={20}
            />
            <Text>이용권 구매</Text>
          </View>

          <Text fontSize={15} style={tw`text-slate-500 mb-2`}>
            한번만 구매하면 식료품을 한도 없이 저장할 수 있어요.
          </Text>
        </View>

        {/* 결제 버튼 */}
        <PaymentBtn />

        <View style={tw`flex-row items-center mt-3 gap-1`}>
          <Icon
            name='information-outline'
            type='MaterialCommunityIcons'
            size={15}
            color={GRAY}
          />
          <Text fontSize={15} style={tw`text-slate-700 mt-0.1`}>
            이용권 구매는 곧 업데이트될 예정입니다.
          </Text>
        </View>
      </View>

      <View style={tw`gap-1 px-1 mt-2`}>
        {settings.map((setting) => (
          <SettingBox key={setting.title} setting={setting} />
        ))}
      </View>
    </Container>
  );
}
