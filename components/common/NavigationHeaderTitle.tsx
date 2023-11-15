import { Text } from './native-component';

export default function NavigationHeaderTitle({ title }: { title: string }) {
  return (
    <Text allowFontScaling={false} fontSize={18}>
      {title}
    </Text>
  );
}
