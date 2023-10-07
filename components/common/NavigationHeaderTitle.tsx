import { Text } from './native-component';

export default function NavigationHeaderTitle({ title }: { title: string }) {
  return (
    <Text allowFontScaling={false} style={{ fontSize: 17 }}>
      {title}
    </Text>
  );
}
