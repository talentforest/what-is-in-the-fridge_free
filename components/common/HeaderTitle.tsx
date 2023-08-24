import { Text } from '../native-component';

export default function HeaderTitle({ title }: { title: string }) {
  return <Text fontSize={18}>{title}</Text>;
}
