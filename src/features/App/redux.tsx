import React, { ReactNode } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import { TypedUseSelectorHook, useDispatch, useSelector, Provider } from 'react-redux';
import homeStore from '../Home/slices';

const middlewares = __DEV__ ? [logger] : [];

const store = configureStore({
  reducer: {
    home: homeStore,
  },
  devTools: __DEV__,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const ReduxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
