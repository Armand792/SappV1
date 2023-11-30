'use client';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/utils/hooks/store.hooks';
import { RootState } from '@/store';
import { useSession } from 'next-auth/react';

const WithAuthMiddleware = (component: any, path?: string) => {
  return (): JSX.Element | Element => {
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

    return <>{typeof component === 'function' ? component() : component} </>;
  };
};

export default WithAuthMiddleware;
