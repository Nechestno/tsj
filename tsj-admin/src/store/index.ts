import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.ts'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Используем localStorage

// Настройка конфигурации для redux-persist
const persistConfig = {
  key: 'root', // Ключ для хранения
  storage, // Хранилище, которое будет использоваться
};
const reducer = combineReducers({
  auth : authReducer,
})
const persistedReducer = persistReducer(persistConfig,reducer );
export const store = configureStore({
  reducer: {
    persistedReducer,
  },

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);