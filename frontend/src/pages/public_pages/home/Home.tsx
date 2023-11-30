import { Button } from '@/components';
import WithAuthMiddleware from '@/components/guards/withAuth';
import { signOut, useSession } from 'next-auth/react';

const Home = () => {
  const user = useSession();
  console.log(user);
  return (
    <WithAuthMiddleware>
      <div className='flex items-center flex-col justify-center h-full w-full mb-[10px]'>
        home
        <Button onClick={() => signOut()}>sign out</Button>
      </div>
    </WithAuthMiddleware>
  );
};

export default Home;
