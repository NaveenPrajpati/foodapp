import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import navbarSlice from './slices/navbarSlice';

import dashboardSlice from './slices/dashboardSlice';
import cartSlice from './slices/cartSlice';
import customerSlice from './slices/customerSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['cartReducer', 'navbarReducer', 'dashboard'],
};

const rootReducer = combineReducers({
  dashboard: dashboardSlice,
  navbarReducer: navbarSlice,
  cartReducer: cartSlice,
  userReducer: customerSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
