import { Button, Input, InputFieldItem } from '@/components/index';
import Link from 'next/link';

const ResetPassword = () => {
  return (
    <main className='w-full max-w-[640px] min-h-[640px] [padding-left:_clamp(1rem,2vw,calc(64rem_/_16))]  [padding-right:_clamp(1rem,2vw,calc(64rem_/_16))]   py-[32px]  bg-white rounded-2xl shadow justify-center items-center gap-2 inline-flex mx-auto'>
      <section className='w-full h-full justify-center items-center gap-2 flex flex-col'>
        <h1 className="mb-[24px] text-center text-black text-4xl font-extrabold font-['Petrona']">
          Reset password
        </h1>
        <h1 className="max-w-[435px] mb-[24px] text-center text-black text-base font-normal font-['Poppins']">
          Enter your account email below. <br />
          If we find an account associated with that email we’ll send you a link
          to update your password.
        </h1>
        <form className='max-w-[400px] w-full'>
          <InputFieldItem>
            <Input placeholder='Email' label='Email' />
          </InputFieldItem>
        </form>

        <Button
          className='!bg-blue-700 !max-w-[400px]  mb-[24px]'
          disabled={true}
        >
          <span className="text-white text-base font-normal font-['Poppins']">
            Send Email
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

export default ResetPassword;
