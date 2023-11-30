import { Button } from '@/components';
import WithAuthMiddleware from '@/components/guards/withAuth';
import { logout } from '@/store/reducers/user.reducers';
import { useAppDispatch } from '@/utils/hooks/store.hooks';
import { signOut, useSession } from 'next-auth/react';

const Home = () => {
  const dispatch = useAppDispatch();

  const signUserOut = () => {
    console.log('here');
    dispatch(
      logout({
        user_id: '',
        token: '',
      })
    );
    signOut();
  };

  return (
    <WithAuthMiddleware>
      <div className='flex items-center flex-col justify-center h-full w-full mb-[10px]'>
        home
        <button
          onClick={() => {
            signUserOut();
          }}
        >
          sign out
        </button>
      </div>
    </WithAuthMiddleware>
  );
};

export default Home;
