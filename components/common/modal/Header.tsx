import { Pressable, View } from 'react-native';
import { Text } from '../../native-component';
import { INDIGO } from '../../../constant/colors';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  title: string;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function Header({ title, setModalVisible }: Props) {
  return (
    <View style={tw`flex-row w-full items-center justify-between px-2`}>
      <Text fontSize={18}>{title}</Text>
      <Pressable onPress={() => setModalVisible(false)} style={tw`p-1`}>
        <Icon
          type='MaterialCommunityIcons'
          name='close'
          size={24}
          color={INDIGO}
        />
      </Pressable>
    </View>
  );
}
