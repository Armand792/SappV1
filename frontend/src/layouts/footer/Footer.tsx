import logo from '@/assets/images/white-logo.png';
import Image from 'next/image';

const Footer = () => {
  return (
    <section className='w-full min-h-[225px] lg:h-[225px]  [padding-left:_clamp(1rem,2vw,calc(24rem_/_16))]  [padding-right:_clamp(1rem,2vw,calc(24rem_/_16))]  py-7 bg-blue-700 flex-col justify-start items-start gap-2 inline-flex  '>
      <div className='self-stretch  h-full justify-start items-start gap-12 inline-flex flex-col lg:flex-row gap-[2rem]'>
        <div className='self-stretch flex-col justify-start items-start  inline-flex gap-[0.5rem] lg: gap-36'>
          <div className='w-28 h-[max-content] justify-center items-center inline-flex lg:h-8'>
            <Image className='w-28 h-8' src={logo} alt='logo' />
          </div>
          <div className="text-white text-xs font-light font-['Poppins']">
            © Worthy Network Inc.{' '}
          </div>
        </div>
        <div className=' w-full self-stretch justify-start items-start gap-16 flex lg:w-96   '>
          <div className='flex-col justify-start items-start gap-2 inline-flex'>
            <div className="text-white text-sm font-bold font-['Poppins']">
              Your Account
            </div>
            <div className="text-white text-sm font-normal font-['Poppins']">
              Sign Up
            </div>
            <div className="text-white text-sm font-normal font-['Poppins']">
              Login
            </div>
            <div className="text-white text-sm font-normal font-['Poppins']">
              Help
            </div>
          </div>
          <div className='flex-col justify-start items-start gap-2 inline-flex'>
            <div className="text-white text-sm font-bold font-['Poppins']">
              About
            </div>
            <div className="text-white text-sm font-normal font-['Poppins']">
              For Volunteers
            </div>
            <div className="text-white text-sm font-normal font-['Poppins']">
              For Charities
            </div>
            <div className="text-white text-sm font-normal font-['Poppins']">
              Register a Charity
            </div>
          </div>
          <div className='flex-col justify-start items-start gap-2 inline-flex'>
            <div className="text-white text-sm font-bold font-['Poppins']">
              Search
            </div>
            <div className="text-white text-sm font-normal font-['Poppins']">
              Search Charities
            </div>
          </div>
        </div>
        <div className='grow  h-[max-content] relative lg:h-48' />
        <div className='w-40 self-stretch justify-start items-start gap-4 flex'>
          {/* <div className='px-2 justify-start items-start gap-2 flex'>
            
          </div> */}
          <div className='w-[1px] h-full border border-white hidden lg:block'></div>
          <div className='self-stretch flex-col justify-start items-start gap-3 inline-flex'>
            <div className='justify-start items-start gap-1.5 inline-flex'>
              <div className='w-6 h-6 relative'>
                <div className='w-6 h-6 left-0 top-0 absolute bg-white rounded-full' />
                <div className='w-3.5 h-3 left-[5px] top-[6px] absolute' />
              </div>
              <div className='w-6 h-6 relative'>
                <div className='w-6 h-6 left-0 top-0 absolute bg-white rounded-full' />
                <div className='w-3.5 h-4 left-[5px] top-[4px] absolute' />
              </div>
              <div className='w-6 h-6 relative'>
                <div className='w-6 h-6 left-0 top-0 absolute bg-white rounded-full' />
                <div className='w-4 h-4 left-[4px] top-[4px] absolute' />
              </div>
            </div>
            <div className='flex-col justify-start items-start gap-3 flex'>
              <div className="w-32 h-4 text-white text-xs font-light font-['Poppins']">
                Terms of Service
              </div>
              <div className="w-32 h-4 text-white text-xs font-light font-['Poppins']">
                Terms of Use
              </div>
              <div className="w-32 h-4 text-white text-xs font-light font-['Poppins']">
                Privacy Policy
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
