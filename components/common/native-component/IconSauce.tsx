import Svg, { G, Mask, Path } from 'react-native-svg';

interface Props {
  size: number;
}

export default function IconSauce({ size }: Props) {
  return (
    <Svg width={size} height={size} viewBox='0 0 48 48'>
      <Mask id='ipSBottleOne0'>
        <G
          fill='none'
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='4'
        >
          <Path
            fill='#fff'
            stroke='#fff'
            d='M15 30a9 9 0 0 1 1.8-5.4l3.6-4.8A3 3 0 0 0 21 18V4h6v14a3 3 0 0 0 .6 1.8l3.6 4.8A9 9 0 0 1 33 30v12a2 2 0 0 1-2 2H17a2 2 0 0 1-2-2V30Z'
          />
          <Path stroke='#000' d='M21 10h6' />
          <Path stroke='#fff' d='M21 12V8m6 4V8' />
        </G>
      </Mask>
      <Path fill='red' d='M0 0h48v48H0z' mask='url(#ipSBottleOne0)' />
    </Svg>
  );
}
