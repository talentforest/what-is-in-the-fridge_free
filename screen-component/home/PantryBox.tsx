import { Path, Rect, Svg } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

export default function PantryBox({ size, color }: Props) {
  return (
    <Svg width={size} height={size} viewBox='0 0 400 400' fill='none'>
      <Path
        d='M395 36L268 51.547C268 51.547 279.781 363.453 285 384C290.219 404.547 383.998 317.375 391.732 290.347C399.466 263.319 395 36 395 36Z'
        fill={color}
      />
      <Path
        d='M388.701 48.8042C401.609 37.0522 393.753 16.2158 376.307 15.6077C299.077 12.916 148.27 8.76953 119.248 16.2071C95.1171 22.3914 47.4868 64.5126 14.2394 96.1837C1.0726 108.726 10.6544 130.131 28.8075 129.061C115.789 123.936 285.964 113.465 307.26 108.792C324.272 105.059 361.289 73.7607 388.701 48.8042Z'
        fill={color}
      />
      <Rect
        width='302.129'
        height='303'
        rx='30'
        transform='matrix(-1 0 0 1 309.862 86)'
        fill={color}
      />
      <Path
        d='M382.567 41.8086L351.728 67.0041L320.889 92.1996'
        stroke='#DDDDDD'
        stroke-width='3'
        stroke-linecap='round'
      />
    </Svg>
  );
}
