'use client';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import * as apiServer from '@/services/api.server';
import { Button, Input, InputFieldItem } from '@/components/index';
import Link from 'next/link';
import notification from '@/utils/notification';
import errorFormmatter from '@/utils/errorFormatter';
import { useRouter } from 'next/navigation';

const ResetSchema = Yup.object().shape({
  email: Yup.string()
    .email('please enter a valid email address')
    .required('email is required'),
});

const initialValue = {
  email: '',
};
interface IFormValues {
  email: string;
}

const ResetPassword = () => {
  const history = useRouter();

  const resetPassword = async (values: IFormValues) => {
    try {
      const payload = {
        email: values.email,
      };
      const response = await apiServer.resetPassword(payload);
      notification({
        title: 'Reset password',
        message: response.result.message,
      });
      history.push(`/reset-password-confirmation?user=${values.email}`);
    } catch (error) {
      notification({
        type: 'danger',
        title: 'Reset password',
        message: errorFormmatter(error),
      });
    }
  };

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
        <Formik
          initialValues={initialValue}
          onSubmit={resetPassword}
          validationSchema={ResetSchema}
        >
          {(props: FormikProps<IFormValues>) => {
            return (
              <>
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
                </form>

                <Button
                  onClick={props.handleSubmit}
                  type='button'
                  isLoading={props.isSubmitting}
                  className='!bg-blue-700 !max-w-[400px]  mb-[24px]'
                  disabled={
                    Object.keys(props.errors).length > 0 || !props.dirty
                      ? true
                      : false
                  }
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
              </>
            );
          }}
        </Formik>
      </section>
    </main>
  );
};

export default ResetPassword;
