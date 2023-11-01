import { Text } from './native-component';

export default function NavigationHeaderTitle({ title }: { title: string }) {
  return (
    <Text allowFontScaling={false} style={{ fontSize: 20 }}>
      {title}
    </Text>
  );
}
