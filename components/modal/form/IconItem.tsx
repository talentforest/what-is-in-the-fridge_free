import { Image, View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { useState } from 'react';
import EmojiPicker, { ko } from 'rn-emoji-keyboard';
import tw from 'twrnc';

interface Props {
  value: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function FormImageItem({ value, changeInfo }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <View
        style={tw`border border-slate-400 rounded-lg flex-1 aspect-square justify-center items-center`}
      >
        {value.includes('http') ? (
          <Image style={tw`h-10 w-10 rounded-md`} source={{ uri: value }} />
        ) : (
          <TouchableOpacity onPress={() => setIsOpen(true)}>
            <Text styletw='text-2xl pt-0.5'>{value}</Text>
          </TouchableOpacity>
        )}
      </View>
      <EmojiPicker
        onEmojiSelected={(emoji) => changeInfo({ image: emoji.emoji })}
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
