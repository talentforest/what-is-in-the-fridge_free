import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/common/native-component';
import { Animated, Image, View } from 'react-native';
import { useImageLoad, useSwiperAnimation } from '../hooks';
import { onboardingSteps } from '../constant/onboardingInfo';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../navigation/Navigation';
import { SCDream5 } from '../constant/fonts';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from '../redux/hook';
import { toggleOnboarding } from '../redux/slice/onboardingSlice';
import { DEVICE_WIDTH } from '../util';
import { PlatformIOS } from '../constant/statusBarHeight';

import StepIndicator from '../components/common/StepIndicator';
import OnBoardingBtn from '../components/buttons/OnBoardingBtn';
import tw from 'twrnc';

export default function OnBoarding() {
  const { onboarding } = useSelector((state) => state.onboarding);

  const navigation = useNavigation<NavigateProp>();
  const dispatch = useDispatch();

  const { isLoaded, assets, getImgUri } = useImageLoad({
    images: [
      require('../assets/onboarding/android-compartments.png'),
      require('../assets/onboarding/android-expired-list.png'),
      require('../assets/onboarding/android-favorite-list.png'),
      require('../assets/onboarding/android-food-detail.png'),
      require('../assets/onboarding/android-my-fridge.png'),
      require('../assets/onboarding/android-shopping-list.png'),
    ],
  });

  const {
    moveStep,
    stepTranslateX,
    currentStep,
    panResponder, //
  } = useSwiperAnimation({ steps: onboardingSteps });

  const completeOnboarding = async () => {
    try {
      if (lastStep && onboarding) {
        dispatch(toggleOnboarding(false));
        navigation.navigate('MyTabs'); // 메인 화면으로 이동
      } else {
        moveStep('next', currentStep.step);
      }
    } catch (error) {
      console.error('온보딩 완료 저장 오류:', error);
    }
  };

  if (!isLoaded) return null;

  const imgWidth = DEVICE_WIDTH * 0.75 > 350 ? 350 : DEVICE_WIDTH * 0.65;
  const lastStep = onboardingSteps.length === currentStep.step;

  return (
    <View style={tw`flex-1`}>
      <SafeAreaView edges={['top', 'bottom']} style={tw`bg-blue-100 flex-1`}>
        <View style={tw`flex-1 pt-8 gap-3`}>
          {/* 단계 표시 */}
          <StepIndicator
            stepLength={onboardingSteps.length}
            currentStepId={currentStep.step}
          />

          {/* 스와이프 화면들 */}
          <Animated.View
            style={{
              flex: 1,
              width: DEVICE_WIDTH,
              transform: [{ translateX: stepTranslateX }],
            }}
            {...panResponder.panHandlers}
          >
            <View style={tw`flex-row flex-1 items-center`}>
              {onboardingSteps.map(({ step, desc, image }) => (
                <View
                  key={step}
                  style={tw`w-full items-center justify-between gap-5`}
                >
                  {/* 문구 */}
                  <View style={tw`items-center`}>
                    <Text
                      style={tw.style(`text-slate-800 text-[15px]`, SCDream5)}
                    >
                      {desc.split(', ')[0]}
                    </Text>
                    <Text
                      style={tw.style(`text-slate-800 text-[15px]`, SCDream5)}
                    >
                      {desc.split(', ')[1]}
                    </Text>
                  </View>

                  {/* 이미지 */}
                  {assets && (
                    <View
                      style={tw.style(
                        `h-[${imgWidth * 2.1}px] w-[${imgWidth}px]
                      overflow-hidden justify-between`
                      )}
                    >
                      <Image
                        source={{ uri: getImgUri(image) }}
                        style={{
                          width: imgWidth,
                          height: PlatformIOS ? imgWidth * 2 : imgWidth * 2.1,
                        }}
                      />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
      {/* 들어가기 버튼 */}
      {lastStep && (
        <LinearGradient
          colors={['rgba(256,256,256,0)', '#c9dbfc', '#9abdfc', '#68adfd']}
          style={tw.style(
            `absolute bottom-0 w-full h-[20%] justify-end items-center pb-10 px-8`
          )}
        >
          {lastStep && (
            <OnBoardingBtn name='시작하기' onPress={completeOnboarding} />
          )}
        </LinearGradient>
      )}
    </View>
  );
}
