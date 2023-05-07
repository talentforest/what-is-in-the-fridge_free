import { TextInput as Input, TextInputProps } from 'react-native';
import { FontGmarketSansRegular } from '../../constant/fonts';
import tw from 'twrnc';

interface Props extends TextInputProps {
  styletw?: string;
}

export function TextInput({ styletw, ...props }: Props) {
  return (
    <Input
      style={tw.style(
        `border border-slate-400 p-2 rounded-lg bg-white ${styletw || ''}`,
        FontGmarketSansRegular
      )}
      {...props}
    />
  );
}
