import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { useState } from 'react';
import EmojiPicker from 'rn-emoji-keyboard';
import tw from 'twrnc';

interface Props {
  value: string;
  changeFoodInfo: (newInfo: { [key: string]: string }) => void;
}

export default function FormImageItem({ value, changeFoodInfo }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <View
      style={tw`aspect-square border items-center p-2 bg-indigo-50 border-slate-400 rounded-lg`}
    >
      <Text styletw='mb-1 text-indigo-500 text-xs'>아이콘 선택</Text>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={tw`flex-1 w-12 h-12 ${
          value.length === 0
            ? 'justify-center bg-white border-slate-400 items-center rounded-lg border'
            : ''
        }`}
      >
        <Text styletw='text-3xl pt-2 px-2'>{value}</Text>
      </TouchableOpacity>
      <EmojiPicker
        onEmojiSelected={(emoji) => changeFoodInfo({ image: emoji.emoji })}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        disabledCategories={[
          'activities',
          'flags',
          'people_body',
          'smileys_emotion',
          'travel_places',
          'symbols',
          'animals_nature',
          'objects',
        ]}
        hideHeader={true}
        categoryPosition='top'
        enableSearchBar={true}
        enableSearchAnimation={true}
        enableRecentlyUsed={true}
      />
    </View>
  );
}
