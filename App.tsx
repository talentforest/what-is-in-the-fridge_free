import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useFonts } from 'expo-font';
import { fonts } from './constant/fonts';
import Navigation from './navigation/Navigation';
import * as SplashScreen from 'expo-splash-screen';
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

  useEffect(() => {
    prepareApp();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Navigation />
            <StatusBar style='dark' />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
