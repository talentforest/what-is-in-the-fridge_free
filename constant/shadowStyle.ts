import { PlatformIOS } from './statusBarHeight';

export const shadowStyle = (spread: number) => {
  return PlatformIOS
    ? {
        shadowColor: '#666',
        shadowOpacity: 0.15,
        shadowOffset: { height: 3, width: 0 },
        shadowRadius: spread - 1,
      }
    : {
        elevation: spread,
        shadowColor: '#666',
      };
};
