import { useState } from 'react';

export default function useToggleModal() {
  const [modalVisible, setModalVisible] = useState(false);

  return {
    modalVisible,
    setModalVisible,
  };
}
