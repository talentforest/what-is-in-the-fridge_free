import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { useState } from 'react';
import EmojiPicker, { ko } from 'rn-emoji-keyboard';
import tw from 'twrnc';

interface Props {
  value: string;
  changeFoodInfo: (newInfo: { [key: string]: string }) => void;
}

export default function FormImageItem({ value, changeFoodInfo }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <View
      style={tw`aspect-square justify-center items-center p-2 bg-white border-2 border-indigo-500 rounded-lg`}
    >
      <TouchableOpacity onPress={() => setIsOpen(true)} style={tw`flex-1`}>
        <Text styletw='mb-1 text-indigo-500 text-xs'>아이콘 선택</Text>
        <Text styletw='text-3xl pt-2 px-2 self-center'>{value}</Text>
      </TouchableOpacity>

      <EmojiPicker
        onEmojiSelected={(emoji) => changeFoodInfo({ image: emoji.emoji })}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        translation={ko}
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
        categoryPosition='top'
        enableRecentlyUsed={true}
      />
    </View>
  );
}
