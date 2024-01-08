import { Path, Rect, Svg } from 'react-native-svg';

interface Props {
  size: number;
}

export default function PantryBox({ size }: Props) {
  const coverColor = '#bfd090';
  const boxColor = '#ffe8a8';
  const holeColor = '#373737';

  return (
    <Svg width={size} height={size} viewBox='0 0 406 400' fill='none'>
      <Path
        d='M395 36L268 51.547C268 51.547 279.781 363.453 285 384C290.219 404.547 383.998 317.375 391.732 290.347C399.466 263.319 395 36 395 36Z'
        fill={boxColor}
      />
      <Rect
        width='302.129'
        height='303'
        rx='30'
        transform='matrix(-1 0 0 1 309.862 86)'
        fill={boxColor}
      />
      <Path
        d='M398.338 49.11C411.804 37.545 404.06 16.1716 386.319 15.5868C305.347 12.9177 146.741 8.78805 116.247 16.172C91.0758 22.2671 41.543 63.5633 6.67975 94.9023C-7.02841 107.225 2.37216 129.14 20.7762 128.116C111.899 123.045 291.179 112.629 313.574 107.986C331.283 104.314 369.642 73.7552 398.338 49.11Z'
        fill={coverColor}
      />
      <Path
        d='M295.047 110.239C294.62 108.592 295.282 106.855 296.697 105.909L398.869 37.6748C401.522 35.9033 405.08 37.7973 405.091 40.9871L405.174 64.5523C405.178 65.7932 404.607 66.9659 403.626 67.7266L308.852 141.268C306.581 143.03 303.249 141.893 302.528 139.111L295.047 110.239Z'
        fill={coverColor}
      />
      <Path
        d='M0 140C0 142.209 1.79086 144 4 144H304C306.209 144 308 142.209 308 140V108H0V140Z'
        fill={coverColor}
      />
      <Path
        d='M376.479 41.25L347.023 64.114L317.567 86.978'
        stroke={'#a5c4a4'}
        strokeWidth='4'
        strokeLinecap='round'
      />
      <Path
        d='M300 181V263.5V346'
        stroke={'#edd17d'}
        strokeWidth='3'
        strokeLinecap='round'
      />
      <Rect x='86' y='168' width='120' height='22' rx='13.5' fill={holeColor} />
    </Svg>
  );
}
