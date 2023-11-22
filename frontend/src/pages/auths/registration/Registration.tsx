import { Button, Input, InputFieldItem } from '@/components/index';
import Link from 'next/link';
import googleIcon from '@/assets/images/google.png';
import Image from 'next/image';

const Registration = () => {
  return (
    <main className='w-full max-w-[640px] min-h-[640px]  [padding-left:_clamp(1rem,2vw,calc(64rem_/_16))]  [padding-right:_clamp(1rem,2vw,calc(64rem_/_16))]   py-[32px]  bg-white rounded-2xl shadow justify-center items-center gap-2 inline-flex mx-auto'>
      <section className='w-full h-full justify-center items-center gap-2 flex flex-col'>
        <div className='w-full h-20 flex-col justify-between items-start inline-flex'>
          <h1 className="self-stretch text-center text-black text-4xl font-extrabold font-['Petrona']">
            Sign up
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
          <InputFieldItem>
            <Input placeholder='Confirm Password' label='Confirm Password' />
          </InputFieldItem>
        </form>

        <div className='grow w-full h-14 p-2 rounded justify-start items-start gap-2 flex max-w-[400px]'>
          <div className='w-6 h-6 relative'>
            <div className='w-4 h-4 left-[3px] top-[3px] absolute rounded-md border-2 border-zinc-800' />
          </div>
          <h5 className="text-zinc-800 text-sm font-normal font-['Poppins']">
            I have read and agree to the{' '}
            <span className='text-blue-700 text-sm font-bold '>
              Terms of Service, Terms of Use{' '}
            </span>
            and{' '}
            <span className='text-blue-700 text-sm font-bold'>
              Privacy Policy.
            </span>
          </h5>
        </div>

        <Button className='!bg-blue-700 !max-w-[400px]' disabled={true}>
          <span className="text-white text-base font-normal font-['Poppins']">
            {' '}
            Sign Up
          </span>
        </Button>
        <span className="w-20 h-4 text-center text-black text-base font-normal font-['Poppins'] leading-tight">
          or
        </span>
        <Button className='!max-w-[400px]'>
          <Image src={googleIcon} alt='google-icon' />
          <span className="text-black text-base font-bold font-['Europa-Bold'] leading-tight">
            Continue with Google{' '}
          </span>
        </Button>

        <h1 className="text-black text-sm font-normal font-['Poppins'] flex gap-[0.2rem] items-center">
          Already have Worthy account?
          <Link
            href={'/login'}
            className="text-blue-700 text-base font-bold font-['Poppins'] cursor-pointer"
          >
            Login
          </Link>
        </h1>
      </section>
    </main>
  );
};

export default Registration;
