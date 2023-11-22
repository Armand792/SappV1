import ResetIcon from '@/assets/svgs/reset-icon.svg';

const ResetConfirmation = () => {
  return (
    <main className='w-full max-w-[640px] min-h-[640px] [padding-left:_clamp(1rem,2vw,calc(64rem_/_16))]  [padding-right:_clamp(1rem,2vw,calc(64rem_/_16))]   py-[32px]  bg-white rounded-2xl shadow justify-center items-center gap-2 inline-flex mx-auto'>
      <section className='w-full max-w-96 h-full justify-center items-center gap-2 flex flex-col'>
        <ResetIcon className='h-[45px] mb-[34.5px]' />
        <h1 className="text-center text-black text-4xl font-extrabold font-['Petrona'] mb-[34.5px]">
          Please check your email
        </h1>
        <h1 className="text-zinc-800 text-base font-normal font-['Poppins'] leading-tight mb-[24px]">
          If we find an account associated with
          <span className="text-blue-700 text-base font-normal font-['Poppins'] leading-tight">
            {' '}
            john@worthycause.com
            <br />
          </span>
          we’ll send you an email to reset your password.{' '}
        </h1>

        <h5 className="text-center text-zinc-800 text-base font-normal font-['Poppins'] leading-tight">
          Didn’t receive an email?{' '}
          <span className="text-zinc-800 text-base font-bold font-['Poppins']">
            Resend Email
          </span>
        </h5>
      </section>
    </main>
  );
};

export default ResetConfirmation;
