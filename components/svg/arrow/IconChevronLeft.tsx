import { Polyline, Svg } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

export default function IconChevronRight({ size = 16, color = '#333' }: Props) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <Polyline points='15 18 9 12 15 6'></Polyline>
    </Svg>
  );
}
