'use client';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/utils/hooks/store.hooks';
import { RootState } from '@/store';
import { useSession } from 'next-auth/react';

const WithAuthMiddleware = (
  component: JSX.Element | Element,
  path?: string
) => {
  return () => {
    const navigation = useRouter();
    const { status } = useSession();
    const userAuth = useAppSelector((state: RootState) => state.user.auth);

    if (
      userAuth.token === '' ||
      userAuth.user_id === '' ||
      status === 'unauthenticated'
    ) {
      navigation.push(path ?? '/login');
    }

    return <>{component}</>;
  };
};

export default WithAuthMiddleware;
