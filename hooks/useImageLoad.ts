import { useAssets } from 'expo-asset';
import { useEffect, useState } from 'react';

interface Props {
  images: number[];
}

export const useImageLoad = ({ images }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [assets, error] = useAssets(images);

  useEffect(() => {
    if (assets && !error) {
      setIsLoaded(true);
    }
  }, [assets, error]);

  const getImgUri = (image: string) => {
    return assets?.find((asset) => `${asset.name}.png` === image)?.uri;
  };

  return {
    isLoaded,
    assets,
    getImgUri,
  };
};
