import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { useState } from 'react';
import { foodEmojis } from '../../../constant/foodEmojis';
import { INDIGO } from '../../../constant/colors';
import EmojiPicker, { ko } from 'rn-emoji-keyboard';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  icon: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function RecommendedIcon({ icon, changeInfo }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getRecommendedEmojis = () => {
    if (icon === '') return;
    return icon.length < 2 ? getMatchOneChar(icon) : getMatchTwoChar(icon);
  };

  const getMatchOneChar = (foodName: string) => {
    return foodEmojis.filter((emoji) => emoji.ko.includes(foodName));
  };

  const getMatchTwoChar = (foodName: string) => {
    const foodNameCharArr = foodName.split('').filter((char) => char !== ' ');

    const recommenedEmojis = foodEmojis.filter((emoji) => {
      const includedChar = foodNameCharArr.find((char) =>
        emoji.ko.includes(char)
      );
      const anotherIncludedChar = foodNameCharArr
        .filter((char) => char !== includedChar)
        .find((char) => emoji.ko.includes(char));

      return includedChar && anotherIncludedChar;
    });
    return recommenedEmojis;
  };

  return (
    <View style={tw`justify-center flex-row gap-1 mb-1`}>
      <View
        style={tw`flex-1 rounded-lg p-2 border border-slate-300 bg-indigo-100`}
      >
        <Text styletw='text-slate-500 text-xs'>추천 아이콘</Text>
        <View style={tw`flex-row gap-1.5 w-full my-1 h-8`}>
          {!!getRecommendedEmojis()?.length ? (
            getRecommendedEmojis()
              ?.slice(0, 7)
              .map((emoji) => (
                <TouchableOpacity
                  key={emoji.en}
                  onPress={() => {
                    changeInfo({ image: emoji.emoji });
                  }}
                  style={tw``}
                >
                  <Text key={emoji.en} styletw='text-2xl -mb-1'>
                    {emoji.emoji}
                  </Text>
                </TouchableOpacity>
              ))
          ) : icon === '' ? (
            <Text styletw='text-xs w-full pt-1 text-slate-600 mt-1'>
              식료품 이름을 작성하면 추천 아이콘이 나타납니다.
            </Text>
          ) : (
            <Text styletw='text-xs w-full pt-1 text-slate-600 mt-1'>
              추천 아이콘이 없습니다.
            </Text>
          )}
        </View>
        <View style={tw`self-end justify-end`}>
          <TouchableOpacity
            onPress={() => setIsOpen(true)}
            style={tw`border-blue-400 justify-end`}
          >
            <View style={tw`flex-row items-center`}>
              <Text styletw='text-indigo-500 text-xs '>다른 아이콘 선택</Text>
              <Icon name='chevron-right' size={18} color={INDIGO} />
            </View>
          </TouchableOpacity>
          <EmojiPicker
            onEmojiSelected={(emoji) => {
              changeInfo({ image: emoji.emoji });
            }}
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
      </View>
    </View>
  );
}
