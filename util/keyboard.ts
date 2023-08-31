import { Keyboard } from 'react-native';

export const closeKeyboard = () => {
  if (Keyboard.isVisible()) return Keyboard.dismiss();
};
