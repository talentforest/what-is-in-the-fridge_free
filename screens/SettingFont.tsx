import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
  baseFontSize,
  getRelativeFontSize,
} from '../components/common/native-component';
import { useDispatch, useSelector } from '../redux/hook';
import { changeFont } from '../redux/slice/fontSlice';
import { BLUE, LIGHT_GRAY } from '../constant/colors';
import {
  Fonts,
  KotraHope,
  LocusSangsang,
  NanumSquareRoundEB,
} from '../constant/fonts';
import { useState } from 'react';
import { useHandleAlert } from '../hooks';
import AlertModal from '../screen-component/modal/AlertModal';
import Container from '../components/common/Container';
import Icon from '../components/common/native-component/Icon';
import SubmitBtn from '../components/buttons/SubmitBtn';
import tw from 'twrnc';

interface FontStyle {
  fontFamily: Fonts;
  fontSize: number;
  fontName: string;
}

const fonts: FontStyle[] = [
  {
    fontFamily: LocusSangsang,
    fontSize: getRelativeFontSize(LocusSangsang, baseFontSize),
    fontName: '로커스상상고딕체',
  },
  {
    fontFamily: NanumSquareRoundEB,
    fontSize: getRelativeFontSize(NanumSquareRoundEB, baseFontSize),
    fontName: '나눔스퀘어라운드체',
  },
  {
    fontFamily: KotraHope,
    fontSize: getRelativeFontSize(KotraHope, baseFontSize),
    fontName: '코트라희망체',
  },
];

export default function SettingFont() {
  const { fontFamily: currFont } = useSelector((state) => state.fontFamily);
  const [font, setFont] = useState(currFont);

  const { alertChangeFont, setAlert } = useHandleAlert();

  const dispatch = useDispatch();

  const onChangeFontPress = () => {
    if (currFont === font) return;
    dispatch(changeFont(font));
    setAlert(alertChangeFont);
  };

  return (
    <Container>
      <View style={tw`gap-1`}>
        <View
          style={tw`h-24 gap-3 border border-slate-300 bg-white items-center justify-center px-5 py-2 rounded-xl`}
        >
          <View
            style={tw`h-8 items-center justify-center border border-slate-300 rounded-full px-2.5`}
          >
            <Text fontSize={15} style={tw.style(`text-slate-600`)}>
              예시문구
            </Text>
          </View>
          <Text
            style={tw.style(`text-center mb-0.5`, {
              fontFamily: font,
              fontSize: getRelativeFontSize(font, baseFontSize),
            })}
          >
            이번 주말에는 냉장고 속 식료품을 관리해볼까요?
          </Text>
        </View>

        <View style={tw`pl-2`}>
          {fonts.map(({ fontFamily, fontSize, fontName }) => (
            <TouchableOpacity
              key={fontName}
              onPress={() => setFont(fontFamily)}
              style={tw`text-sm flex-row items-center gap-1.5 h-10`}
            >
              <Icon
                name={font === fontFamily ? 'check-circle-fill' : 'circle'}
                color={font === fontFamily ? BLUE : LIGHT_GRAY}
                type='Octicons'
                size={14}
              />
              <Text style={{ fontFamily, fontSize, lineHeight: 20 }}>
                {fontName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={tw`mt-4`}>
        <SubmitBtn btnName='폰트 변경하기' onPress={onChangeFontPress} />
      </View>

      <AlertModal />
    </Container>
  );
}
