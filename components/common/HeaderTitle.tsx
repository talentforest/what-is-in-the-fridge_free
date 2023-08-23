import { Text } from '../native-component';

export default function HeaderTitle({ title }: { title: string }) {
  return <Text fontSize={16}>{title}</Text>;
}
