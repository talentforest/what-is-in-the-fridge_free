import Icon from '../components/native-component/Icon';

interface Props {
  name: string;
  color: string;
}

export default function TabIcon({ name, color }: Props) {
  return (
    <Icon type='MaterialCommunityIcons' name={name} color={color} size={20} />
  );
}
