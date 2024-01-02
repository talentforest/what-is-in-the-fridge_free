import { Pressable, View } from 'react-native';
import { Text } from '../components/common/native-component';
import { useSelector } from '../redux/hook';
import { useState } from 'react';
import {
  NOTIFICATION_CHANNEL_ID,
  useNotification,
} from '../hooks/useNotification';

import Container from '../components/common/Container';
import ToggleBtn from '../components/buttons/ToggleBtn';
import * as Notifications from 'expo-notifications';
import TimeBtn from '../components/buttons/TimeBtn';
import DayBtn from '../components/buttons/DayBtn';
import tw from 'twrnc';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function SettingNotification() {
  const [dayPickerVisible, setDayPickerVisible] = useState(false);

  const { notification, approachDate } = useSelector(
    (state) => state.notification
  );

  const { toggleNotiSetting } = useNotification();

  return (
    <Pressable style={tw`flex-1`} onPress={() => setDayPickerVisible(false)}>
      <Container topPadding>
        <View style={tw`mx-2`}>
          <View style={tw`pb-2 flex-row justify-between items-center`}>
            <Text style={tw`text-slate-800`}>{NOTIFICATION_CHANNEL_ID}</Text>

            <View style={tw`h-7`}>
              <ToggleBtn
                active={notification}
                onTogglePress={toggleNotiSetting}
                width={18}
                color='indigo'
                toggleBtnNames={['', '']}
              />
            </View>
          </View>

          {notification ? (
            <View style={tw`mt-4 gap-3`}>
              <View style={tw`py-0.5 flex-row justify-between items-center`}>
                <Text fontSize={16} style={tw`text-slate-600`}>
                  알림 시간
                </Text>
                <TimeBtn />
              </View>

              <View>
                <View style={tw`py-0.5 flex-row justify-between items-center`}>
                  <Text fontSize={16} style={tw`text-slate-600`}>
                    임박 날짜
                  </Text>
                  <DayBtn
                    dayPickerVisible={dayPickerVisible}
                    setDayPickerVisible={setDayPickerVisible}
                  />
                </View>

                <Text fontSize={15} style={tw`text-gray-500`}>
                  {`소비기한이 ${approachDate}일 이하로 남은 식료품들을 알려드려요`}
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
      </Container>
    </Pressable>
  );
}
