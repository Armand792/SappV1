import WithAuthMiddleware from '@/components/guards/withAuth';

const Home = () => {
  return (
    <WithAuthMiddleware>
      <div className='flex items-center justify-center h-full w-full'>home</div>
    </WithAuthMiddleware>
  );
};

export default Home;
