import { TextInput as Input, Platform, TextInputProps } from 'react-native';
import { FontGmarketSansRegular } from '../../constant/fonts';
import tw from 'twrnc';
import { TouchableOpacity } from './TouchableOpacity';

interface Props extends TextInputProps {
  styletw?: string;
  onPress?: () => void;
}

export function TextInput({ styletw, onPress, ...props }: Props) {
  const onTouchPress = () => {
    if (typeof onPress === 'undefined') return null;
    onPress();
  };

  return (
    <>
      {Platform.OS === 'android' ? (
        <TouchableOpacity onPress={onTouchPress}>
          <Input
            style={tw.style(
              `border border-slate-400 h-9 p-2 rounded-lg bg-white ${
                styletw || ''
              }`,
              FontGmarketSansRegular
            )}
            {...props}
          />
        </TouchableOpacity>
      ) : (
        <Input
          style={tw.style(
            `border border-slate-400 p-2 h-9 rounded-lg bg-white ${
              styletw || ''
            }`,
            FontGmarketSansRegular
          )}
          {...props}
        />
      )}
    </>
  );
}
