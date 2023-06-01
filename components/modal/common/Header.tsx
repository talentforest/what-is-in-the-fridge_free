import { Pressable, View } from 'react-native';
import { Text } from '../../native-component';
import { INDIGO } from '../../../constant/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

interface Props {
  title: string;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function Header({ title, setModalVisible }: Props) {
  return (
    <View style={tw`flex-row w-full items-center justify-between`}>
      <Text styletw='text-lg'>{title}</Text>
      <Pressable onPress={() => setModalVisible(false)}>
        <Icon name='close' size={24} color={INDIGO} />
      </Pressable>
    </View>
  );
}
