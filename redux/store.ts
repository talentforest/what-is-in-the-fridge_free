import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import fridgeFoodsReducer from './slice/food-list/fridgeFoodsSlice';
import favoriteFoodsReducer from './slice/food-list/favoriteFoodsSlice';
import shoppingListReducer from './slice/food-list/shoppingListSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fridgeInfoReducer from './slice/fridgeInfoSlice';
import toggleOnboardingReducer from './slice/onboardingSlice';
import changeFilterReducer from './slice/filterSlice';
import pantryFoodsReducer from './slice/food-list/pantryFoodsSlice';
import toggleFavoriteReducer from './slice/food/isFavoriteSlice';
import toggleMemoReducer from './slice/food/isMemoOpenSlice';
import searchedFoodNameReducer from './slice/food/searchedFoodSlice';
import toggleAlertModalReducer from './slice/alertModalSlice';
import changeFontReducer from './slice/fontSlice';
import formFoodReducer from './slice/food/formFoodSlice';
import checkedListReducer from './slice/food-list/checkListSlice';
import categoryReducer from './slice/food/categorySlice';
import afterAnimationReducer from './slice/afterAnimationSlice';
import modalVisibleReducer from './slice/modalVisibleSlice';
import purchaseReducer from './slice/purchaseSlice';

const reducers = {
  fridgeFoods: fridgeFoodsReducer,
  favoriteFoods: favoriteFoodsReducer,
  shoppingList: shoppingListReducer,
  checkedList: checkedListReducer,
  fridgeInfo: fridgeInfoReducer,
  onboarding: toggleOnboardingReducer,
  filter: changeFilterReducer,
  pantryFoods: pantryFoodsReducer,
  isFavorite: toggleFavoriteReducer,
  isMemoOpen: toggleMemoReducer,
  searchedFoodName: searchedFoodNameReducer,
  modalVisible: modalVisibleReducer,
  alertModal: toggleAlertModalReducer,
  fontFamily: changeFontReducer,
  formFood: formFoodReducer,
  category: categoryReducer,
  afterAnimation: afterAnimationReducer,
  purchaseState: purchaseReducer,
};

const rootReducer = combineReducers({ ...reducers });

type ReducersState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<ReducersState> = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
