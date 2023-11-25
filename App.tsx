import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useFonts } from 'expo-font';
import { fonts } from './constant/fonts';
import Navigation from './navigation/Navigation';
import Splash from './screens/Splash';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) return null;

  if (!appIsReady) {
    return (
      <Splash
        appIsReady={appIsReady}
        setAppIsReady={setAppIsReady}
        persistor={persistor}
      />
    );
  }

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
