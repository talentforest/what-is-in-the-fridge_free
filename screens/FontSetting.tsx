import { View } from 'react-native';
import { Text, TouchableOpacity } from '../components/common/native-component';
import { useDispatch, useSelector } from '../redux/hook';
import { changeFont } from '../redux/slice/fontSlice';
import { DEEP_GRAY, MEDIUM_GRAY } from '../constant/colors';
import { Fonts } from '../constant/fonts';
import Container from '../components/common/Container';
import Icon from '../components/common/native-component/Icon';
import tw from 'twrnc';

interface FontStyle {
  fontFamily: Fonts;
  fontSize: number;
  fontName: string;
}

const fonts: FontStyle[] = [
  { fontFamily: 'HsSaemaul', fontSize: 17, fontName: 'HS새마을체' },
  { fontFamily: 'KotraHope', fontSize: 17, fontName: '코트라 희망체' },
  {
    fontFamily: 'NanumSquareRoundEB',
    fontSize: 15,
    fontName: '나눔스퀘어라운드체',
  },
];

export default function FontSetting() {
  const { fontFamily: currFont } = useSelector((state) => state.fontFamily);

  const dispatch = useDispatch();

  const onChangeFontPress = (font: Fonts) => dispatch(changeFont(font));

  return (
    <Container>
      <View style={tw`gap-1`}>
        <View
          style={tw`border border-slate-300 bg-white items-center justify-center px-5 py-5 rounded-xl`}
        >
          <Text style={tw`text-center`}>
            이번 주말에 장을 한번 보러 갈까요?
          </Text>
        </View>

        <View style={tw`pl-2`}>
          {fonts.map(({ fontFamily, fontSize, fontName }) => (
            <TouchableOpacity
              key={fontName}
              onPress={() => onChangeFontPress(fontFamily)}
              style={tw`flex-row items-center gap-1.5 h-10`}
            >
              <Icon
                name={currFont === fontFamily ? 'check-circle-fill' : 'circle'}
                color={currFont === fontFamily ? DEEP_GRAY : MEDIUM_GRAY}
                type='Octicons'
                size={14}
              />
              <Text
                style={{
                  fontFamily,
                  fontSize,
                  letterSpacing: fontFamily === 'HsSaemaul' ? 0.5 : 0,
                  lineHeight: 24,
                }}
              >
                {fontName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Container>
  );
}
