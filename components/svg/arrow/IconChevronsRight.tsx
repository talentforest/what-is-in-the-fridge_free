import { Polyline, Svg } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

export default function IconChevronsRight({
  size = 16,
  color = '#333',
}: Props) {
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
      <Polyline points='13 17 18 12 13 7'></Polyline>
      <Polyline points='6 17 11 12 6 7'></Polyline>
    </Svg>
  );
}
