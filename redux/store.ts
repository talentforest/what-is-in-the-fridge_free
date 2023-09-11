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
import allFoodsReducer from './slice/allFoodsSlice';
import favoriteFoodsReducer from './slice/favoriteFoodsSlice';
import shoppingListReducer from './slice/shoppingListSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import selectedFoodReducer from './slice/selectedFoodSlice';
import fridgeInfoReducer from './slice/fridgeInfoSlice';
import toggleOnboardingReducer from './slice/onboardingSlice';
import toggleDragModeReducer from './slice/dragModeSlice';
import changeCompartmentNumReducer from './slice/compartmentNumToDropSlice';
import changeFilterReducer from './slice/filterSlice';
import toggleShowBtnReducer from './slice/showBtnSlice';
import pantryFoodsReducer from './slice/pantryFoodsSlice';

const reducers = {
  allFoods: allFoodsReducer,
  favoriteFoods: favoriteFoodsReducer,
  shoppingList: shoppingListReducer,
  selectedFood: selectedFoodReducer,
  fridgeInfo: fridgeInfoReducer,
  onboarding: toggleOnboardingReducer,
  dragMode: toggleDragModeReducer,
  compartmentNumToDrop: changeCompartmentNumReducer,
  currentFilter: changeFilterReducer,
  showBtn: toggleShowBtnReducer,
  pantryFoods: pantryFoodsReducer,
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
