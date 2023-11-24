import { Ellipse, Path, Rect, Svg } from 'react-native-svg';
import { LIGHT_GRAY, MEDIUM_GRAY } from '../../../constant/colors';

interface Props {
  size: number;
  inActive: boolean;
}

export default function IconCan({ size, inActive }: Props) {
  return (
    <Svg width={size} height={size} viewBox='0 0 12 12' fill='none'>
      <Ellipse
        cx='6'
        cy='3.57143'
        rx='5'
        ry='2.57143'
        fill={inActive ? LIGHT_GRAY : '#2183fa'}
      />
      <Ellipse
        cx='6'
        cy='7.42885'
        rx='5'
        ry='2.57143'
        fill={inActive ? LIGHT_GRAY : '#2183fa'}
      />
      <Rect
        x='1'
        y='3.57227'
        width='10'
        height='3.85714'
        fill={inActive ? LIGHT_GRAY : '#2c8bff'}
      />
      <Path
        d='M1.30005 5.5C4.5 7.5 7.5 7.5 10.8 5.5'
        stroke={inActive ? LIGHT_GRAY : '#2183fa'}
        stroke-width='0.1'
        stroke-linecap='round'
      />
      <Path
        d='M2.31033 4.37434C1.84345 3.73612 2.06481 2.99267 2.80475 2.71378L4.64187 2.02136C5.38181 1.74247 6.36013 2.03376 6.82701 2.67197V2.67197C7.29389 3.31018 7.07253 4.05364 6.33259 4.33253L4.49547 5.02495C3.75553 5.30384 2.77721 5.01255 2.31033 4.37434V4.37434Z'
        fill={inActive ? LIGHT_GRAY : '#d1d1d1'}
      />
      <Path
        d='M2.84657 4.07535C2.62793 3.77647 2.73159 3.4283 3.07811 3.2977L5.11776 2.52894C5.46428 2.39834 5.92243 2.53475 6.14107 2.83363V2.83363C6.35972 3.13251 6.25605 3.48067 5.90953 3.61128L3.86988 4.38003C3.52336 4.51064 3.06521 4.37422 2.84657 4.07535V4.07535Z'
        fill={inActive ? MEDIUM_GRAY : '#2183fa'}
      />
      <Rect
        width='2.04084'
        height='0.809421'
        transform='matrix(0.60102 0.799234 -0.931116 0.364722 4.43115 2.49219)'
        fill={inActive ? LIGHT_GRAY : '#2d8bff'}
      />
    </Svg>
  );
}
