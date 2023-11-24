import { TextInput, View } from 'react-native';
import { useRef, useState } from 'react';
import {
  DateState,
  DateType,
} from '../../screen-component/modal/DateNumInputModal';
import { Text } from './native-component';
import { formattedToday, getDateToken } from '../../util';
import { PlatformIOS } from '../../constant/statusBarHeight';
import { useSelector } from '../../redux/hook';
import tw from 'twrnc';

interface Props {
  dateToken: string[];
  setDateToken: (tokens: string[]) => void;
  setInValidDate: React.Dispatch<React.SetStateAction<DateState>>;
  width: number;
}

export default function DateNumTokenBox({
  dateToken,
  setDateToken,
  setInValidDate,
  width,
}: Props) {
  const { fontFamily } = useSelector((state) => state.fontFamily);
  const [isFocusedItem, setIsFocusedItem] = useState(0);

  const fontSize = fontFamily === 'NanumSquareRoundEB' ? 21 : 24;

  const textInputRefs = useRef<TextInput[]>([]);

  const setRef = (ele: TextInput, index: number) =>
    (textInputRefs.current[index] = ele);

  const changeFocus = (index: number) => {
    const updatedDateToken = [...dateToken];
    updatedDateToken[index] = '';
    setDateToken(updatedDateToken);
    setIsFocusedItem(index);
  };

  const moveFocus = (direction: 'prev' | 'next', index: number) => {
    const nextIndex = index < 5 ? index + 1 : 5;
    const prevIndex = index > 0 ? index - 1 : 0;
    const indexToGo = direction === 'next' ? nextIndex : prevIndex;

    textInputRefs.current[indexToGo].focus();
    setIsFocusedItem(direction === 'next' ? index + 1 : index - 1);
  };

  const handleInputText = (index: number, text: string) => {
    const updatedDateToken = [...dateToken];
    updatedDateToken[index] = text;
    setDateToken(updatedDateToken);
    moveFocus('next', index);
  };

  const removeInputText = (index: number) => {
    if (isFocusedItem === 6 && dateToken[index]?.length) {
      changeFocus(isFocusedItem - 1);
    } else {
      const updatedDateToken = [...dateToken];
      updatedDateToken[index] = '';
      updatedDateToken[index - 1] = '';
      setDateToken(updatedDateToken);
      moveFocus('prev', index);
    }
    setInValidDate((prev) => ({ ...prev, state: 'ok' }));
  };

  const onChangeText = (text: string, index: number) => {
    if (index < 0 || index > 5) return;
    if (text.length === 1) handleInputText(index, text);
    if (text.length === 0 && dateToken[index].length === 1)
      removeInputText(index);
  };

  const onKeyPress = (key: string, index: number) => {
    if (key === 'Backspace') removeInputText(index);
  };

  return (
    <View style={tw` items-center justify-center`}>
      <View style={tw`flex-row items-center gap-0.5`}>
        {[1, 2, 3, 4, 5, 6].map((number, idx) => (
          <View key={number} style={tw`flex-row gap-0.5 items-center h-full`}>
            <View
              style={tw.style(
                `bg-stone-100 w-[${width}px] aspect-square 
                 rounded-md items-center justify-center ${
                   isFocusedItem === idx ||
                   (isFocusedItem === 6 && idx + 1 === isFocusedItem) ||
                   (isFocusedItem === -1 && idx - 1 === isFocusedItem)
                     ? 'border-amber-400 border-2'
                     : 'border-slate-200 border-2'
                 }`
              )}
            >
              <TextInput
                ref={(element: TextInput) => setRef(element, idx)}
                allowFontScaling={false}
                placeholder={getDateToken(formattedToday)[idx]}
                placeholderTextColor='#e3e3e3'
                keyboardType='number-pad'
                maxLength={1}
                selectionColor={'#f5f5f4'}
                value={dateToken[idx]}
                autoFocus={idx === isFocusedItem - 1}
                onFocus={() => changeFocus(idx)}
                onChangeText={(text) => onChangeText(text, idx)}
                onKeyPress={({ nativeEvent: { key } }) => onKeyPress(key, idx)}
                style={tw.style(
                  `h-full text-[${fontSize}px] rounded-md 
                  ${PlatformIOS ? '' : 'pl-2 pt-0.5'}`,
                  { letterSpacing: 1, fontFamily }
                )}
              />
            </View>

            {idx / 2 === 0.5 && <DateTypeText dateType='년' />}
            {idx / 2 === 1.5 && <DateTypeText dateType='월' />}
            {idx / 2 === 2.5 && <DateTypeText dateType='일' />}
          </View>
        ))}
      </View>
    </View>
  );
}

const DateTypeText = ({ dateType }: { dateType: DateType }) => {
  return (
    <Text
      style={tw`text-slate-500 self-end 
      ${dateType !== '일' ? 'mr-1' : ''}`}
    >
      {dateType}
    </Text>
  );
};
