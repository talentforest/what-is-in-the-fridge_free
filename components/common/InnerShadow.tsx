import { View } from 'react-native';
import tw from 'twrnc';

export default function InnerShadow() {
  return (
    <View
      style={tw.style(`h-full w-full`, {
        position: 'absolute',
        borderRadius: 8,
        backgroundColor: 'transparent',
        borderWidth: 0.1,
        borderColor: '#666',
        overflow: 'hidden',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#666',
        shadowOpacity: 4,
        elevation: 1,
      })}
    />
  );
}
