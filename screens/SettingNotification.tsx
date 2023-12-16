import { View } from 'react-native';
import { Text } from '../components/common/native-component';
import { useState } from 'react';
import { BLUE, ICE_BLUE } from '../constant/colors';

import Container from '../components/common/Container';
import ToggleBtn from '../components/buttons/ToggleBtn';
import * as Notifications from 'expo-notifications';
import tw from 'twrnc';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function SettingNotification() {
  const [notiExpired, setNotiExpired] = useState(false);

  const onTogglePress = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: '소비기한 만료 식료품 안내',
        body: '소비기한이 만료된 식료품이 있습니다.',
      },
      trigger: {
        seconds: 2,
      },
    });

    setNotiExpired((prev) => !prev);
  };

  return (
    <Container>
      <View style={tw`mx-2 py-1.5 flex-row justify-between items-center`}>
        <Text style={tw`text-slate-800`}>소비기한 주의 식료품 알림</Text>

        <View style={tw`h-8`}>
          <ToggleBtn
            active={notiExpired}
            onTogglePress={onTogglePress}
            width={22}
            activeColor={BLUE}
            inActiveColor={ICE_BLUE}
          />
        </View>
      </View>
    </Container>
  );
}
