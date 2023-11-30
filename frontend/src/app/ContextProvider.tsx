'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from 'next-auth/react';

const ContextProvider = ({
  children,
  session,
}: {
  children: any;
  session: any;
}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={session}>{children} </SessionProvider>
      </PersistGate>{' '}
    </Provider>
  );
};

export default ContextProvider;
