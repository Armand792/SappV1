'use client';
import { Button, Input, InputFieldItem } from '@/components/index';
import Link from 'next/link';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import notification from '@/utils/notification';
import errorFormmatter from '@/utils/errorFormatter';
import * as apiServer from '@/services/api.server';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const VerificationSchema = Yup.object().shape({
  code: Yup.string().max(6).required('verification code is required'),
});

const initialValue = {
  code: '',
};
interface IFormValues {
  code: string;
}

const Verification = () => {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const history = useRouter();

  const verifyAccount = async (values: IFormValues) => {
    try {
      setLoading(true);
      const response = await apiServer.verifyAccount({
        code: values.code,
        email: params!.get('user') ?? '',
      });

      notification({
        title: 'Verification',
        message: response.result.message,
      });

      history.push('/login');
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      notification({
        title: 'Verification',
        message: errorFormmatter(error),
        type: 'danger',
      });
    }
  };

  return (
    <main className='w-full max-w-[640px] min-h-[640px] [padding-left:_clamp(1rem,2vw,calc(64rem_/_16))]  [padding-right:_clamp(1rem,2vw,calc(64rem_/_16))]   py-[32px]  bg-white rounded-2xl shadow justify-center items-center gap-2 inline-flex mx-auto'>
      <Formik
        initialValues={initialValue}
        onSubmit={verifyAccount}
        validationSchema={VerificationSchema}
      >
        {(props: FormikProps<IFormValues>) => {
          return (
            <section className='w-full h-full justify-center items-center gap-2 flex flex-col'>
              <h1 className="mb-[24px] text-center text-black text-4xl font-extrabold font-['Petrona']">
                Verify account
              </h1>
              <h1 className="max-w-[435px] mb-[24px] text-center text-black text-base font-normal font-['Poppins']">
                Enter your verification code
              </h1>
              <form className='max-w-[400px] w-full'>
                <InputFieldItem
                  isError={props.errors.code ? true : false}
                  message={props.errors.code}
                >
                  <Input
                    isError={props.errors.code ? true : false}
                    name='code'
                    placeholder='Code'
                    label='Verification Code'
                    onChange={(
                      event: React.SyntheticEvent<HTMLInputElement>
                    ) => {
                      props.setFieldValue('code', event?.currentTarget.value);
                      if (event?.currentTarget.value.length === 6) {
                        props.handleSubmit();
                      } else {
                        props.setSubmitting(false);
                      }
                    }}
                  />
                </InputFieldItem>
              </form>

              <Button
                onClick={props.handleSubmit}
                disabled={
                  Object.keys(props.errors).length > 0 || !props.dirty
                    ? true
                    : false
                }
                className='!bg-blue-700 !max-w-[400px]  mb-[24px]'
                isLoading={loading}
              >
                <span className="text-white text-base font-normal font-['Poppins']">
                  Verify
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
          );
        }}
      </Formik>
    </main>
  );
};

export default Verification;
