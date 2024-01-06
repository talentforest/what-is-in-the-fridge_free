import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useFonts } from 'expo-font';
import { fonts } from './constant/fonts';
import { PATHNAME_ALLFOODS, PATHNAME_HOME, prefix } from './constant/link';
import { Platform } from 'react-native';
import { NOTIFICATION_CHANNEL_ID } from './constant/notification';

import * as SplashScreen from 'expo-splash-screen';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import Navigation from './navigation/Navigation';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

const App = () => {
  const [fontsLoaded] = useFonts(fonts);

  const prepareApp = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    } catch (e) {
      console.warn(e);
    }
  };

  const changeChannel = async () => {
    const existingChannel = await Notifications.getNotificationChannelAsync(
      NOTIFICATION_CHANNEL_ID
    );

    if (Platform.OS === 'android' && existingChannel === null) {
      Notifications.deleteNotificationChannelAsync(
        'expo_notifications_fallback_notification_channel'
      );
      Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNEL_ID, {
        name: NOTIFICATION_CHANNEL_ID,
        importance: Notifications.AndroidImportance.HIGH,
      });
    }
  };

  useEffect(() => {
    prepareApp();
    changeChannel();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer
            linking={{
              prefixes: [prefix],
              config: {
                initialRouteName: 'Home',
                screens: {
                  Home: PATHNAME_HOME,
                  AllFoods: PATHNAME_ALLFOODS,
                },
              },

              async getInitialURL() {
                const url = await Linking.getInitialURL();

                if (url != null) {
                  return url;
                }
                const response =
                  await Notifications.getLastNotificationResponseAsync();

                return response?.notification.request.content.data.url;
              },

              subscribe(listener) {
                const onReceiveURL = ({ url }: { url: string }) =>
                  listener(url);

                const eventListenerSubscription = Linking.addEventListener(
                  'url',
                  onReceiveURL
                );

                const subscription =
                  Notifications.addNotificationResponseReceivedListener(
                    (response) => {
                      const url =
                        response.notification.request.content.data.url;

                      listener(url);
                    }
                  );

                return () => {
                  eventListenerSubscription.remove();
                  subscription.remove();
                };
              },
            }}
          >
            <Navigation />
            <StatusBar style='dark' />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
