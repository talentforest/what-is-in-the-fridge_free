import { useCallback, useEffect } from 'react';
import { Image, View } from 'react-native';
import { Persistor } from 'redux-persist';
import { useImageLoad } from '../hooks';
import * as SplashScreen from 'expo-splash-screen';
import tw from 'twrnc';

interface Props {
  appIsReady: boolean;
  setAppIsReady: (appIsReady: boolean) => void;
  persistor: Persistor;
}

export default function Splash({
  appIsReady,
  setAppIsReady,
  persistor,
}: Props) {
  const { isLoaded, assets } = useImageLoad({
    images: [require('../assets/fridge.png')],
  });

  useEffect(() => {
    async function prepareApp() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        persistor.purge();
      } catch (e) {
        // console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepareApp();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) return null;

  return (
    <View
      style={tw`flex-1 items-center justify-center bg-[#DADDFF]`}
      onLayout={onLayoutRootView}
    >
      {assets && (
        <Image
          source={{ uri: assets[0].localUri }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </View>
  );
}
