import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { useState } from 'react';
import { foodEmojis } from '../../constant/foodEmojis';
import { INDIGO } from '../../constant/colors';
import EmojiPicker, { ko } from 'rn-emoji-keyboard';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  value: string;
  foodName: string;
  changeFoodInfo: (newInfo: { [key: string]: string }) => void;
}

export default function FormImageItem({
  value,
  foodName,
  changeFoodInfo,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getRecommendedEmojis = () => {
    if (foodName === '') return;
    return foodName.length < 2
      ? getMatchOneChar(foodName)
      : getMatchTwoChar(foodName);
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
        style={tw`border py-2 px-3 h-22 flex-1 gap-0.5 bg-indigo-50 rounded-lg`}
      >
        <Text styletw='text-xs text-indigo-500'>추천 아이콘</Text>

        <View style={tw`absolute right-2 bottom-2 self-end flex-1 justify-end`}>
          <TouchableOpacity
            onPress={() => setIsOpen(true)}
            style={tw`border-blue-400 justify-end`}
          >
            <View style={tw`flex-row items-center`}>
              <Text styletw='text-indigo-500 text-xs'>
                다른 아이콘 선택하기
              </Text>
              <Icon name='chevron-right' size={18} color={INDIGO} />
            </View>
          </TouchableOpacity>
          <EmojiPicker
            onEmojiSelected={(emoji) => {
              changeFoodInfo({ image: emoji.emoji });
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
        <View style={tw`flex-row gap-1.5 w-full`}>
          {!!getRecommendedEmojis()?.length ? (
            getRecommendedEmojis()
              ?.slice(0, 8)
              .map((emoji) => (
                <TouchableOpacity
                  key={emoji.en}
                  onPress={() => {
                    changeFoodInfo({ image: emoji.emoji });
                  }}
                  style={tw``}
                >
                  <Text key={emoji.en} styletw='text-2xl -mb-1'>
                    {emoji.emoji}
                  </Text>
                </TouchableOpacity>
              ))
          ) : foodName === '' ? (
            <Text styletw='text-xs w-full text-center text-slate-600 mt-1'>
              식료품 이름을 작성해보세요.
            </Text>
          ) : (
            <Text styletw='text-xs w-full text-center text-slate-600 mt-1'>
              추천 아이콘이 없습니다.
            </Text>
          )}
        </View>
      </View>
      <View
        style={tw`gap-2 self-center aspect-square h-22 border justify-center items-center rounded-lg bg-white p-2`}
      >
        <Text styletw='text-xs text-indigo-500 self-start'>아이콘</Text>
        <Text styletw='text-4xl pt-2 flex-1'>{value}</Text>
      </View>
    </View>
  );
}
