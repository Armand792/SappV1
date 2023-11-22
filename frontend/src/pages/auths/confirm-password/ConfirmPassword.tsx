import { Button, Input, InputFieldItem } from '@/components/index';
import Link from 'next/link';

const ConfirmPassword = () => {
  return (
    <main className='w-full max-w-[640px] min-h-[640px] [padding-left:_clamp(1rem,2vw,calc(64rem_/_16))]  [padding-right:_clamp(1rem,2vw,calc(64rem_/_16))]   py-[32px]  bg-white rounded-2xl shadow justify-center items-center gap-2 inline-flex mx-auto'>
      <section className='w-full h-full justify-center items-center gap-2 flex flex-col'>
        <div className='w-full h-20 flex-col justify-between items-start inline-flex'>
          <h1 className="self-stretch text-center text-black text-4xl font-extrabold font-['Petrona']">
            Enter new password
          </h1>
          <h2 className="self-stretch text-center text-black text-base font-normal font-['Poppins']">
            Enter your new password below to continue.
          </h2>
        </div>
        <form className='max-w-[400px] w-full'>
          <InputFieldItem>
            <Input placeholder='Password' label='Password' />
          </InputFieldItem>
          <InputFieldItem>
            <Input placeholder='Confirm Password' label='Confirm Password' />
          </InputFieldItem>
        </form>

        <Button
          className='!bg-blue-700 !max-w-[400px]  mb-[24px]'
          disabled={true}
        >
          <span className="text-white text-base font-normal font-['Poppins']">
            {' '}
            Reset Password
          </span>
        </Button>

        <h1 className="text-black text-sm font-normal font-['Poppins']">
          Back to{' '}
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

export default ConfirmPassword;
