import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/common/native-component';
import {
  Animated,
  Dimensions,
  Image,
  View,
  useWindowDimensions,
} from 'react-native';
import { useImageLoad, useSwiperAnimation } from '../hooks';
import { onboardingSteps } from '../constant/onboardingInfo';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../navigation/Navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from '../redux/hook';
import { toggleOnboarding } from '../redux/slice/onboardingSlice';

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
      require('../assets/onboarding/android-fridge-setting.png'),
      require('../assets/onboarding/android-shopping-list.png'),
      require('../assets/onboarding/android-home.png'),
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
        navigation.navigate('Home');
      } else {
        moveStep('next', currentStep.step);
      }
    } catch (error) {
      console.error('온보딩 완료 저장 오류:', error);
    }
  };

  if (!isLoaded) return null;

  const windowHeight = Dimensions.get('window').height;

  const imgHeight =
    windowHeight > 900 ? windowHeight * 0.5 : windowHeight * 0.65;

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
              width: '100%',
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
                    {[desc.split(', ')[0], desc.split(', ')[1]].map((desc) => (
                      <Text
                        key={desc}
                        fontSize={15}
                        style={tw.style(`text-slate-800`, {
                          lineHeight: 24,
                          fontFamily: 'NanumSquareRoundEB',
                        })}
                      >
                        {desc}
                      </Text>
                    ))}
                  </View>

                  {/* 이미지 */}
                  {assets && (
                    <View
                      style={tw.style(`h-[${imgHeight}px] 
                      w-[${imgHeight / 2.1}px] 
                      overflow-hidden justify-between`)}
                    >
                      <Image
                        source={{ uri: getImgUri(image) }}
                        style={{
                          width: imgHeight / 2.1,
                          height: imgHeight,
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
            `absolute bottom-0 w-full h-[24%] justify-end items-center pb-10 px-8`
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
