import { Pressable, View } from 'react-native';
import { Text } from '../../native-component';
import { INDIGO } from '../../../constant/colors';
import tw from 'twrnc';
import Icon from '../../native-component/Icon';

interface Props {
  title: string;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function Header({ title, setModalVisible }: Props) {
  return (
    <View style={tw`flex-row w-full items-center justify-between`}>
      <Text fontSize={18}>{title}</Text>
      <Pressable onPress={() => setModalVisible(false)}>
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
