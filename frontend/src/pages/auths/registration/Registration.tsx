'use client';
import { Button, Input, InputFieldItem } from '@/components/index';
import Link from 'next/link';
import googleIcon from '@/assets/images/google.png';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import * as apiServer from '@/services/api.server';
import { IRegisterPayload } from '@/interfaces/user.interface';
import notification from '@/utils/notification';
import errorFormmatter from '@/utils/errorFormatter';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signIn, signOut, getSession } from 'next-auth/react';
import { useAppDispatch } from '@/utils/hooks/store.hooks';
import { saveLoginData } from '@/store/reducers/user.reducers';

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('please enter a valid email address')
    .required('email is required'),
  password: Yup.string().required('password is required'),
  confirmPassword: Yup.string().required('re-enter password to confirm'),
});

const initialValue = {
  email: '',
  password: '',
  confirmPassword: '',
};
interface IFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const Registration = () => {
  const dispatch = useAppDispatch();
  const history = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const googleSignin = async () => {
    try {
      signIn('google', { redirect: false, prompt: 'login' });
    } catch (error: any) {}
  };

  const registration = async (values: IFormValues) => {
    try {
      const payload: IRegisterPayload = {
        email: values.email,
        password: values.password,
      };
      const response = await apiServer.register(payload);

      notification({
        title: 'Registration',
        message: response.result.message,
      });

      history.push(`/email-confirmation?user=${values.email}`);
    } catch (error) {
      notification({
        title: 'Registration',
        type: 'danger',
        message: errorFormmatter(error),
      });
    }
  };

  const autoLogin = async () => {
    return await apiServer.continueWithGoogle({
      email: session?.user.email ?? '',
      token: session?.accessToken ?? '',
    });
  };

  useEffect(() => {
    // if (session === null || session === undefined) {
    //   return;
    // }
    if (
      status === 'unauthenticated' ||
      session === null ||
      session === undefined
    ) {
      return;
    }

    autoLogin()
      .then((response) => {
        dispatch(
          saveLoginData({
            token: response.result.data[0].token,
            user_id: response.result.data[0].user_id,
          })
        );

        history.push('/');
      })
      .catch((error) => {
        notification({
          title: 'Register',
          type: 'danger',
          message: errorFormmatter(error),
        });
        signOut({ redirect: false });
      });
  }, [status]);
  

  return (
    <main className='w-full max-w-[640px] min-h-[640px]  [padding-left:_clamp(1rem,2vw,calc(64rem_/_16))]  [padding-right:_clamp(1rem,2vw,calc(64rem_/_16))]   py-[32px]  bg-white rounded-2xl shadow justify-center items-center gap-2 inline-flex mx-auto'>
      <Formik
        initialValues={initialValue}
        onSubmit={registration}
        validationSchema={RegisterSchema}
        validate={(values: IFormValues) => {
          const errors: { [key: string]: any } = {};

          if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 're-enter valid password';
          }
          return errors;
        }}
      >
        {(props: FormikProps<IFormValues>) => {
          return (
            <section className='w-full h-full justify-center items-center gap-2 flex flex-col'>
              <div className='w-full  flex-col justify-between items-start inline-flex'>
                <h1 className="self-stretch text-center text-black text-4xl font-extrabold font-['Petrona']">
                  Sign up
                </h1>
                <h2 className="self-stretch text-center text-black text-base font-normal font-['Poppins']">
                  The network for charities & volunteers
                </h2>
              </div>

              <form className='max-w-[400px] w-full'>
                <InputFieldItem
                  isError={props.errors.email ? true : false}
                  message={props.errors.email}
                >
                  <Input
                    name='email'
                    onChange={props.handleChange}
                    placeholder='email'
                    label='Email'
                    isError={props.errors.email ? true : false}
                  />
                </InputFieldItem>
                <InputFieldItem
                  isError={props.errors.password ? true : false}
                  message={props.errors.password}
                >
                  <Input
                    type='password'
                    placeholder='Password'
                    label='Password'
                    name='password'
                    isError={props.errors.password ? true : false}
                    onChange={props.handleChange}
                  />
                </InputFieldItem>
                <InputFieldItem
                  isError={props.errors.confirmPassword ? true : false}
                  message={props.errors.confirmPassword}
                >
                  <Input
                    type='password'
                    name='confirmPassword'
                    isError={props.errors.confirmPassword ? true : false}
                    placeholder='Confirm Password'
                    label='Confirm Password'
                    onChange={props.handleChange}
                  />
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

              <Button
                isLoading={props.isSubmitting}
                className='!bg-blue-700 !max-w-[400px]'
                onClick={props.handleSubmit}
                type='button'
                disabled={
                  Object.keys(props.errors).length > 0 || !props.dirty
                    ? true
                    : false
                }
              >
                <span className="text-white text-base font-normal font-['Poppins']">
                  {' '}
                  Sign Up
                </span>
              </Button>
              <span className="w-20 h-4 text-center text-black text-base font-normal font-['Poppins'] leading-tight">
                or
              </span>
              <Button className='!max-w-[400px]' onClick={() => googleSignin()}>
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
          );
        }}
      </Formik>
    </main>
  );
};

export default Registration;
