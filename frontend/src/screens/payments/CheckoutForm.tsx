import { Button } from '@/components/index';
import { FormikProps, Formik } from 'formik';
import * as Yup from 'yup';
import * as apiServer from '@/services/api.server';

const CheckoutFormSchema = Yup.object().shape({
  currency: Yup.string().required('currency is required'),
  amount: Yup.number().required('amount is required'),
});

const initialValue = {
  currency: '',
  amount: 0,
};
interface IFormValues {
  currency: string;
  amount: number;
}

const CheckoutForm = ({ handleOpenCheckout }: any) => {
  const checkoutPayment = (values: IFormValues) => {
    if (handleOpenCheckout) {
      handleOpenCheckout(values);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValue}
        onSubmit={checkoutPayment}
        validate={(values) => {
          const errors: { [key: string]: any } = {};
          if (values.amount === 0) {
            errors.amount = 'Amount must be greater than 0 ';
          }
          return errors;
        }}
        validationSchema={CheckoutFormSchema}
      >
        {(props: FormikProps<IFormValues>) => {
          return (
            <div className='max-w-sm mx-auto mb-[20px]'>
              <h1 className='text-bold mb-[20px]'>Buy credit</h1>
              <label
                htmlFor='countries'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
              >
                Select currency
                <select
                  onChange={props.handleChange}
                  name='currency'
                  id='countries'
                  className='mb-[2px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                >
                  <option defaultChecked={true} value={'eur'}>
                    Euro
                  </option>
                  <option value={'usd'}>USD</option>
                </select>
                <span className='block text-red-500'>
                  {props.errors.currency}
                </span>
              </label>

              <label
                htmlFor='amount'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
              >
                Amount
                <input
                  defaultValue={0}
                  onChange={props.handleChange}
                  name='amount'
                  type='number'
                  id='amount'
                  aria-describedby='helper-text-explanation'
                  className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='$0.00'
                />
                <span className='block text-red-500'>
                  {props.errors.amount}
                </span>
              </label>

              <p
                id='helper-text-explanation'
                className='mt-2 text-sm text-gray-500 dark:text-gray-400 mb-[20px]'
              >
                We’ll never share your details. Read our{' '}
                <a
                  href='#'
                  className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                >
                  Privacy Policy
                </a>
                .
              </p>
              <Button type='button' onClick={props.handleSubmit}>
                Get credit
              </Button>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default CheckoutForm;
