'use client';
import ResetIcon from '@/assets/svgs/reset-icon.svg';
import { Button } from '@/components';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const RegistrationConfirmation = () => {
  const params = useSearchParams();
  const history = useRouter();

  const navigate = () => {
    history.push(`/verify-account?user=${params?.get('user')}`);
  };

  return (
    <main className='my-[4rem] w-full max-w-[640px] min-h-[640px] [padding-left:_clamp(1rem,2vw,calc(64rem_/_16))]  [padding-right:_clamp(1rem,2vw,calc(64rem_/_16))]   py-[32px]  bg-white rounded-2xl shadow justify-center items-center gap-2 inline-flex mx-auto'>
      <section className='w-full max-w-96 h-full justify-center items-center gap-2 flex flex-col'>
        <ResetIcon className='h-[45px] mb-[34.5px]' />

        <h1 className="text-center text-black text-4xl font-extrabold font-['Petrona'] mb-[34.5px]">
          Please verify your email
        </h1>
        <h2 className="text-zinc-800 text-base font-normal font-['Poppins'] leading-tight  mb-[24px]">
          We’ve sent an email to
          <span className="text-blue-700 text-base font-normal font-['Poppins'] leading-tight">
            {' '}
            {params?.get('user')}
            <br />
          </span>
        </h2>
        <h2 className="text-zinc-800 text-base font-normal font-['Poppins'] leading-tight mb-[25.5px]">
          Please click on the verify button to verify your email address.
        </h2>

        <h5 className="text-center text-zinc-800 text-base font-normal font-['Poppins'] leading-tight mb-[24px]">
          Didn’t receive an email?{' '}
          <span className="text-blue-700 cursor-pointer text-base font-bold font-['Poppins']">
            Resend Email
          </span>
        </h5>

        <Button
          className='!bg-blue-700 !max-w-[400px]'
          type='button'
          onClick={navigate}
        >
          <span className="text-white text-base font-normal font-['Poppins']">
            {' '}
            Verify account
          </span>
        </Button>
      </section>
    </main>
  );
};

export default RegistrationConfirmation;
