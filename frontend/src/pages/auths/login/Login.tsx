import { Button, Input, InputFieldItem } from '@/components/index';
import Link from 'next/link';
import googleIcon from '@/assets/images/google.png';
import Image from 'next/image';

const Login = () => {
  return (
    <main className='w-full max-w-[640px] min-h-[640px] [padding-left:_clamp(1rem,2vw,calc(64rem_/_16))]  [padding-right:_clamp(1rem,2vw,calc(64rem_/_16))]   py-[32px]  bg-white rounded-2xl shadow justify-center items-center gap-2 inline-flex mx-auto'>
      <section className='w-full h-full justify-center items-center gap-2 flex flex-col'>
        <div className='w-full h-20 flex-col justify-between items-start inline-flex'>
          <h1 className="self-stretch text-center text-black text-4xl font-extrabold font-['Petrona']">
            Login to Worthy
          </h1>
          <h2 className="self-stretch text-center text-black text-base font-normal font-['Poppins']">
            The network for charities & volunteers
          </h2>
        </div>
        <form className='max-w-[400px] w-full'>
          <InputFieldItem>
            <Input placeholder='email' label='Email' />
          </InputFieldItem>
          <InputFieldItem>
            <Input placeholder='Password' label='Password' />
          </InputFieldItem>
        </form>

        <Button className='!bg-blue-700 !max-w-[400px] ' disabled={true}>
          <span className="text-white text-base font-normal font-['Poppins']">
            {' '}
            Login
          </span>
        </Button>
        <span className="w-20 h-4 text-center text-black text-base font-normal font-['Poppins'] leading-tight">
          or
        </span>
        <Button className='!max-w-[400px]'>
          <Image alt='google-icon' src={googleIcon} />
          <span className="text-black text-base font-bold font-['Europa-Bold'] leading-tight">
            Continue with Google{' '}
          </span>
        </Button>

        <h1 className="text-black text-sm font-normal font-['Poppins'] flex gap-[0.2rem] items-center">
          Forgot your password?{' '}
          <Link
            href={'reset-password'}
            className="text-blue-700 text-base font-bold font-['Poppins'] cursor-pointer"
          >
            Reset Password
          </Link>
        </h1>

        <h1 className="text-black text-sm font-normal font-['Poppins'] flex gap-[0.2rem] items-center">
          New to Worthy?
          <Link
            href={'/register'}
            className="text-blue-700 text-base font-bold font-['Poppins'] cursor-pointer"
          >
            Sign Up
          </Link>
        </h1>
      </section>
    </main>
  );
};

export default Login;
