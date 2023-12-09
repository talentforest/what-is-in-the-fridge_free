import Svg, { Line, Path, Rect } from 'react-native-svg';

interface Props {
  height: number;
}

export const fridgeColor = '#e0e0e0'; // e7e7e7
export const fridgeBorderColor = '#c9c9c9';

export default function SvgFridgeContainer({ height }: Props) {
  return (
    <Svg
      width={height / 1.2}
      height={height}
      viewBox='0 0 1004 1200'
      fill='none'
    >
      <Rect
        x='576'
        y='74'
        width='428'
        height='1101.9'
        rx='30'
        fill={fridgeColor}
      />
      <Path
        d='M973.379 143.88L991.556 136.44L1000 1162.58L994.667 1170.39L987.822 1178.16L978.667 1186.46L965.778 1195.64L973.379 143.88Z'
        fill={fridgeColor}
      />
      <Path
        d='M590.5 78.1319L991.435 86.9039L990.369 99.3601L551 109.352C551 109.352 564.389 95.7277 571 90.5282C577.611 85.3288 590.5 78.1319 590.5 78.1319Z'
        fill={fridgeColor}
      />
      <Rect
        x='541'
        y='102.466'
        width='440'
        height='1097.53'
        rx='30'
        fill={fridgeColor}
      />
      <Path
        d='M1.928 24L152 79.4926C152 79.4926 125.5 1152.5 121.5 1187C117.5 1221.5 18.7281 1088 6.95064 1041.47C-4.82686 994.933 1.928 24 1.928 24Z'
        fill={fridgeColor}
      />
      <Rect
        x='101'
        y='105'
        width='440'
        height='1095'
        rx='30'
        fill={fridgeColor}
      />
      <Path
        d='M8.21803 36.2324C-5.66409 24.5657 2.33228 2.55125 20.4636 2.2696C124.809 0.648771 356.545 -2.29433 379.783 3.11057C399.414 7.67651 474.602 66.6748 524.503 107.14C539.4 119.22 530.279 142.911 511.127 141.891C396.962 135.814 155.452 122.442 125.925 116.562C101.459 111.69 45.9551 67.9472 8.21803 36.2324Z'
        fill={fridgeColor}
      />
      <Line
        x1='28.9474'
        y1='36.8482'
        x2='107.848'
        y2='111.053'
        stroke='#666'
        stroke-width='10'
        stroke-linecap='round'
      />
    </Svg>
  );
}
