import { useCallback, useEffect } from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';
import { useFonts } from 'expo-font';
import { fonts } from '../constant/fonts';
import { Text } from '../components/common/native-component';
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
  const [fontsLoaded] = useFonts(fonts);
  const { isLoaded, assets } = useImageLoad({
    images: [require('../assets/question-fridge.png')],
  });

  useEffect(() => {
    async function prepareApp() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepareApp();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && appIsReady && isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoaded]);

  if (!fontsLoaded || !isLoaded) return null;

  return (
    <View
      style={tw`flex-1 items-center justify-center bg-blue-300`}
      onLayout={onLayoutRootView}
    >
      {assets && (
        <Image
          source={assets[0] as ImageSourcePropType}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Text style={tw`mt-12 text-xl`}>냉장고에 뭐가 있지?</Text>
    </View>
  );
}
