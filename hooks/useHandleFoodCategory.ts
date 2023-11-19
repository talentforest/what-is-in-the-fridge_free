import { useState } from 'react';
import { Category } from '../constant/foodCategories';
import { closeKeyboard } from '../util';

export const useHandleFoodCategory = () => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState<Category>('신선식품류');

  const onCategoryChangePress = (category: Category) => {
    setCategory(category);
    setIsCategoryModalOpen(false);
  };

  const onCategoryModalOpenPress = () => {
    closeKeyboard();
    setIsCategoryModalOpen(true);
  };

  return {
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    category,
    setCategory,
    onCategoryChangePress,
    onCategoryModalOpenPress,
  };
};
