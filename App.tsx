import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';
import Navigation from './navigation/Navigation';
import Splash from './screens/Splash';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import tw from 'twrnc';
import { View } from 'react-native';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  if (!appIsReady) {
    return <Splash appIsReady={appIsReady} setAppIsReady={setAppIsReady} />;
  }

  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Navigation />
          <StatusBar style='auto' />
        </NavigationContainer>
      </SafeAreaProvider>
    </ReduxProvider>
  );
}
