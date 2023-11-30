'use client';
import { Button, Input, InputFieldItem } from '@/components/index';
import Link from 'next/link';
import googleIcon from '@/assets/images/google.png';
import Image from 'next/image';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import * as apiServer from '@/services/api.server';
import notification from '@/utils/notification';
import errorFormmatter from '@/utils/errorFormatter';
import { useRouter } from 'next/navigation';
import { saveLoginData } from '@/store/reducers/user.reducers';
import { useAppDispatch } from '@/utils/hooks/store.hooks';
import { ILoginPayload } from '@/interfaces/user.interface';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('please enter a valid email address')
    .required('email is required'),
  password: Yup.string().required('password is required'),
});

const initialValue = {
  email: '',
  password: '',
};
interface IFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const history = useRouter();
  const dispatch = useAppDispatch();

  const { data: session, status } = useSession();

  const googleSignin = () => {
    try {
      signIn('google', { redirect: false, prompt: 'login' });
    } catch (error: any) {}
  };

  const login = async (values: IFormValues) => {
    try {
      const payload: ILoginPayload = {
        email: values.email,
        password: values.password,
      };
      const response = await apiServer.login(payload);
      dispatch(
        saveLoginData({
          token: response.result.data[0].token,
          user_id: response.result.data[0].user_id,
        })
      );

      notification({
        title: 'Login',
        message: response.result.message,
      });

      history.push('/');
    } catch (error) {
      notification({
        title: 'Login',
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
    <main className='w-full max-w-[640px] min-h-[640px] [padding-left:_clamp(1rem,2vw,calc(64rem_/_16))]  [padding-right:_clamp(1rem,2vw,calc(64rem_/_16))]   py-[32px]  bg-white rounded-2xl shadow justify-center items-center gap-2 inline-flex mx-auto'>
      <Formik
        initialValues={initialValue}
        onSubmit={login}
        validationSchema={LoginSchema}
      >
        {(props: FormikProps<IFormValues>) => {
          return (
            <section className='w-full h-full justify-center items-center gap-2 flex flex-col'>
              <div className='w-full flex-col justify-between items-start inline-flex'>
                <h1 className="self-stretch text-center text-black text-4xl font-extrabold font-['Petrona']">
                  Login to Worthy
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
              </form>

              <Button
                className='!bg-blue-700 !max-w-[400px] '
                isLoading={props.isSubmitting}
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
                  Login
                </span>
              </Button>
              <span className="w-20 h-4 text-center text-black text-base font-normal font-['Poppins'] leading-tight">
                or
              </span>
              <Button className='!max-w-[400px]' onClick={googleSignin}>
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
          );
        }}
      </Formik>
    </main>
  );
};

export default Login;
