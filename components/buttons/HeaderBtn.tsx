import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from '../common/native-component';
import { NavigateProp } from '../../navigation/Navigation';
import IconChevronLeft from '../svg/arrow/IconChevronLeft';
import tw from 'twrnc';
import IconGear from '../svg/IconGear';

interface Props {
  btn: 'back' | 'setting';
}

export default function HeaderBtn({ btn }: Props) {
  const navigation = useNavigation<NavigateProp>();

  const onBackBtnPress = () => navigation.goBack();

  const onSettingBtnPress = () => navigation.navigate('FridgeSetting');

  return (
    <>
      {btn === 'back' ? (
        <TouchableOpacity onPress={onBackBtnPress} style={tw`p-2`}>
          <IconChevronLeft size={20} />
        </TouchableOpacity>
      ) : btn === 'setting' ? (
        <TouchableOpacity onPress={onSettingBtnPress} style={tw`p-2`}>
          <IconGear size={20} />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </>
  );
}
