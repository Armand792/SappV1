'use client';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from 'next-auth/react';

const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider> {children}</SessionProvider>
      </PersistGate>{' '}
    </Provider>
  );
};

export default ContextProvider;
