'use client';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/utils/hooks/store.hooks';
import { RootState } from '@/store';

const WithAuthMiddleware = ({ children }: { children: React.ReactNode }) => {
  const navigation = useRouter();
  const userAuth = useAppSelector((state: RootState) => state.user.auth);

  if (userAuth.token && userAuth.user_id) {
    return <>{children} </>;
  } else {
    navigation.push('/login');
  }
};

export default WithAuthMiddleware;
