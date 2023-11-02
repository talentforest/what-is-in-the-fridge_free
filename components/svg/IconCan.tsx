import { Ellipse, Path, Rect, Svg } from 'react-native-svg';
import { LIGHT_GRAY } from '../../constant/colors';

interface Props {
  size: number;
  inActive: boolean;
}

export default function IconCan({ size, inActive }: Props) {
  return (
    <Svg width={size} height={size} viewBox='0 0 12 12' fill='none'>
      <Ellipse
        cx='6'
        cy='4.28571'
        rx='5'
        ry='2.28571'
        fill={inActive ? LIGHT_GRAY : '#7EB9FF'}
      />
      <Ellipse
        cx='6'
        cy='7.71443'
        rx='5'
        ry='2.28571'
        fill={inActive ? LIGHT_GRAY : '#7EB9FF'}
      />
      <Rect
        x='1'
        y='4.28613'
        width='10'
        height='3.42857'
        fill={inActive ? LIGHT_GRAY : '#7EB9FF'}
      />
      <Path
        d='M1.30005 5.5C4.5 7.5 7.5 7.5 10.8 5.5'
        stroke={inActive ? LIGHT_GRAY : '#898989'}
        stroke-width='0.1'
        stroke-linecap='round'
      />
      <Path
        d='M2.83427 3.25413L4.67139 2.56171C5.38549 2.29256 6.32965 2.57368 6.78023 3.18961C7.2308 3.80553 7.01717 4.52303 6.30307 4.79217L4.46595 5.4846C3.75185 5.75374 2.80769 5.47263 2.35711 4.8567C1.90654 4.24078 2.12017 3.52328 2.83427 3.25413Z'
        fill={inActive ? LIGHT_GRAY : '#5D5D5D'}
        stroke={inActive ? LIGHT_GRAY : '#AAAAAA'}
        stroke-width='0.1'
      />
      <Path
        d='M2.91608 4.57469C2.64523 4.20444 2.77365 3.77314 3.20291 3.61134L4.94291 2.95553C5.37217 2.79374 5.93973 2.96273 6.21059 3.33298V3.33298C6.48144 3.70323 6.35302 4.13453 5.92375 4.29632L4.18376 4.95214C3.75449 5.11393 3.18694 4.94494 2.91608 4.57469V4.57469Z'
        fill={inActive ? LIGHT_GRAY : '#7EB9FF'}
      />
      <Rect
        width='2.04084'
        height='0.643903'
        transform='matrix(0.60102 0.799234 -0.931116 0.364722 4.43115 2.99219)'
        fill={inActive ? LIGHT_GRAY : '#5D5D5D'}
      />
    </Svg>
  );
}
