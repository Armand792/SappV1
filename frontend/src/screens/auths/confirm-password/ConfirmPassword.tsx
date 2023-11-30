'use client';
import { Button, Input, InputFieldItem } from '@/components/index';
import Link from 'next/link';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import * as apiServer from '@/services/api.server';
import notification from '@/utils/notification';
import errorFormmatter from '@/utils/errorFormatter';
import { useRouter, useSearchParams } from 'next/navigation';

const ResetPasswordConfirmationSchema = Yup.object().shape({
  code: Yup.string().max(6).required('code is required'),
  password: Yup.string().required('password is required'),
  confirmPassword: Yup.string().required('re-enter password to confirm'),
});

const initialValue = {
  code: '',
  password: '',
  confirmPassword: '',
};
interface IFormValues {
  code: string;
  password: string;
  confirmPassword: string;
}

const ConfirmPassword = () => {
  const params = useSearchParams();
  const history = useRouter();

  const confirmPasswordReset = async (values: IFormValues) => {
    try {
      const payload = {
        email: params?.get('user') ?? '',
        code: values.code,
        password: values.password,
      };
      const response = await apiServer.resetPasswordConfirmation(payload);
      notification({
        title: 'Reset password confirmation',
        message: response.result.message,
      });
      history.push('/login');
    } catch (error) {
      notification({
        type: 'danger',
        title: 'Reset password confirmation',
        message: errorFormmatter(error),
      });
    }
  };

  return (
    <main className='my-[4rem] w-full max-w-[640px] min-h-[640px] [padding-left:_clamp(1rem,2vw,calc(64rem_/_16))]  [padding-right:_clamp(1rem,2vw,calc(64rem_/_16))]   py-[32px]  bg-white rounded-2xl shadow justify-center items-center gap-2 inline-flex mx-auto'>
      <Formik
        initialValues={initialValue}
        onSubmit={confirmPasswordReset}
        validationSchema={ResetPasswordConfirmationSchema}
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
              <div className='w-full h-20 flex-col justify-between items-start inline-flex'>
                <h1 className="self-stretch text-center text-black text-4xl font-extrabold font-['Petrona']">
                  Enter new password
                </h1>
                <h2 className="self-stretch text-center text-black text-base font-normal font-['Poppins']">
                  Enter your new password below and code to continue.
                </h2>
              </div>
              <form className='max-w-[400px] w-full'>
                <InputFieldItem
                  isError={props.errors.code ? true : false}
                  message={props.errors.code}
                >
                  <Input
                    placeholder='Code'
                    label='Code'
                    name='code'
                    onChange={props.handleChange}
                    isError={props.errors.code ? true : false}
                  />
                </InputFieldItem>

                <InputFieldItem
                  isError={props.errors.password ? true : false}
                  message={props.errors.password}
                >
                  <Input
                    placeholder='Password'
                    label='Password'
                    type='password'
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

              <Button
                className='!bg-blue-700 !max-w-[400px]  mb-[24px]'
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
          );
        }}
      </Formik>
    </main>
  );
};

export default ConfirmPassword;
