import { useAssets } from 'expo-asset';
import { useEffect, useState } from 'react';

interface Props {
  images: number[];
}

export default function useImageLoad({ images }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [assets, error] = useAssets(images);

  useEffect(() => {
    if (assets && !error) {
      setIsLoaded(true);
    }
  }, [assets, error]);

  return {
    isLoaded,
    assets,
  };
}
