import { KeyboardType, View } from 'react-native';
import { Text, TextInput, TouchableOpacity } from '../native-component';
import tw from 'twrnc';

interface Props {
  changeFoodInfo: (newInfo: { [key: string]: string }) => void;
  value: string;
  keyboardType?: KeyboardType;
}

export default function FormQuantityItem({
  value,
  keyboardType,
  changeFoodInfo,
}: Props) {
  const onChangeText = (value: string) => {
    if (/^\d+$/.test(value) || value === '')
      return changeFoodInfo({ quantity: value });
  };

  return (
    <View
      style={tw`bg-indigo-50 gap-1 flex-1 border p-2 rounded-lg border-slate-400`}
    >
      <Text styletw='mb-2 text-indigo-500 text-xs'>식료품 수량</Text>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder='0'
        keyboardType={keyboardType}
        onPressIn={() => {
          if (value === '0') return changeFoodInfo({ quantity: '' });
        }}
        onBlur={() => {
          if (value === '') return changeFoodInfo({ quantity: '0' });
        }}
      />
      <View style={tw`flex-row gap-0.5 justify-end mt-2`}>
        <TouchableOpacity
          onPress={() => {
            changeFoodInfo({ quantity: `${+value + 1}` });
          }}
          style={tw`border border-slate-500 bg-green-300 justify-center items-center py-1 w-10 rounded-2xl`}
        >
          <Text styletw='text-indigo-600'>+1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (value === '0' || value === '' || +value < 0) return;
            changeFoodInfo({ quantity: `${+value - 1}` });
          }}
          style={tw`border border-slate-500 bg-red-300 justify-center items-center py-1 w-10 rounded-2xl`}
        >
          <Text styletw='text-indigo-600'>-1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
