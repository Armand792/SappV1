import Footer from '../footer/Footer';
import logo from '@/assets/images/logo.png';
import Image from 'next/image';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='w-full '>
      <div className='w-full h-28 p-2 bg-white justify-center items-center gap-2 inline-flex fixed'>
        <div className='w-full h-16 justify-center items-center flex'>
          <Image alt='logo' className='w-60 h-16 max-w-full' src={logo} />
        </div>
      </div>
      <div className='min-h-screen pt-28 w-full flex flex-col items-center justify-center px-4'>
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default AuthLayout;
