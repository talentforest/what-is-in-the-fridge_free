import { Pressable, View } from 'react-native';
import { Text } from '../components/common/native-component';
import { useSelector } from '../redux/hook';
import { useNotification } from '../hooks';
import { NOTIFICATION_CHANNEL_ID } from '../constant/notification';

import Container from '../components/common/Container';
import ToggleBtn from '../components/buttons/ToggleBtn';
import * as Notifications from 'expo-notifications';
import TimeBtn from '../components/buttons/TimeBtn';
import tw from 'twrnc';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function SettingNotification() {
  const { notification } = useSelector((state) => state.notification);

  const { toggleNotiSetting, cancelNotifications } = useNotification();

  const onTogglePress = () => {
    if (notification) {
      cancelNotifications();
    }
    toggleNotiSetting();
  };

  return (
    <Pressable style={tw`flex-1`}>
      <Container topPadding>
        <View style={tw`mx-2`}>
          <View style={tw`pb-2 flex-row justify-between items-center`}>
            <Text style={tw`text-slate-800`}>{NOTIFICATION_CHANNEL_ID}</Text>

            <View style={tw`h-7`}>
              <ToggleBtn
                active={notification}
                onTogglePress={onTogglePress}
                width={18}
                color='indigo'
                toggleBtnNames={['', '']}
              />
            </View>
          </View>

          {notification ? (
            <View style={tw`mt-4 py-0.5 flex-row justify-between items-center`}>
              <Text fontSize={16} style={tw`text-slate-600`}>
                알림 시간
              </Text>
              <TimeBtn />
            </View>
          ) : (
            <></>
          )}
        </View>
      </Container>
    </Pressable>
  );
}
