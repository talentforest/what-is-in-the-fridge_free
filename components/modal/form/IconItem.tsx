import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { useState } from 'react';
import { INDIGO } from '../../../constant/colors';
import EmojiPicker, { ko } from 'rn-emoji-keyboard';
import tw from 'twrnc';
import Icon from '../../native-component/Icon';

interface Props {
  value: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function FormImageItem({ value, changeInfo }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={tw`h-full`}>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={tw`border border-slate-400 rounded-lg flex-1 aspect-square justify-center items-center`}
      >
        {value === '' ? (
          <Icon
            type='MaterialCommunityIcons'
            name='food-fork-drink'
            color={INDIGO}
            size={22}
          />
        ) : (
          <Text style={tw`pt-0.5`} fontSize={18}>
            {value}
          </Text>
        )}
      </TouchableOpacity>

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
