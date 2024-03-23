import { Button } from '@/components';
import WithAuthMiddleware from '@/components/guards/withAuth';
import { logout } from '@/store/reducers/user.reducers';
import { useAppDispatch } from '@/utils/hooks/store.hooks';
import { useRouter } from 'next/navigation';
import { StripeCheckout } from '@/screens/payments/StripeCheckout';
import CheckoutForm from '@/screens/payments/CheckoutForm';
import { useEffect, useState } from 'react';
import { ICheckoutData } from '@/interfaces/payments';
import * as apiServer from '@/services/api.server';
import TransferCredit from './TransferCredit';

const Home = () => {
  const dispatch = useAppDispatch();
  const history = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [platformUsers, setPlatformUser] = useState([]);
  const [userDashboardInformation, setUserDashboardInformation] = useState<any>(
    {}
  );
  const [isGettingCredit, setIsGettingCredit] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [openTransferCredit, setOpenTransferCredit] = useState(false);
  const [checkoutData, setCheckoutData] = useState<ICheckoutData>({
    amount: 0,
    currency: '',
  });

  const signUserOut = () => {
    dispatch(
      logout({
        user_id: '',
        token: '',
      })
    );
    history.push('/login');
  };

  const handleOpenCheckout = (checkoutData: ICheckoutData) => {
    setOpenCheckout(true);
    setIsGettingCredit(false);
    setOpenTransferCredit(false);
    setCheckoutData(checkoutData);
  };

  const getUserInformation = async (): Promise<void> => {
    try {
      const response = await apiServer.getUserDashBoardInformation();
      setUserDashboardInformation(response.result.data);
    } catch (error) {
      setUserDashboardInformation({});
    }
  };

  const getPlatformUsers = async () => {
    try {
      const response = await apiServer.getPlatformUsers();
      setPlatformUser(response.result?.data?.users ?? []);
    } catch (error) {
      setPlatformUser([]);
    }
  };

  const getUserTransactions = async () => {
    try {
      const response = await apiServer.getUserTransactions();
      setTransactions(response.result?.data?.transactions ?? []);
    } catch (error) {
      setTransactions([]);
    }
  };

  useEffect(() => {
    getUserInformation();
    getPlatformUsers();
    getUserTransactions();
  }, []);

  return (
    <WithAuthMiddleware>
      <div className='flex items-center flex-col justify-center h-full w-full mb-[10px]'>
        <h1 className='mb-[20px]'>
          User: {userDashboardInformation?.user_email}
        </h1>
        <h4 className='mb-[20px]'>
          Wallet Balance:{' '}
          <span className='text-green-500'>
            {userDashboardInformation?.wallet_balance}
          </span>
        </h4>
        <div className='w-full flex gap-[1rem] mb-[20px]'>
          <Button
            className='w-[100px]'
            onClick={() => {
              setIsGettingCredit(true);
              setOpenCheckout(false);
              setOpenTransferCredit(false);
            }}
          >
            Buy credits
          </Button>
          <Button
            className='w-[100px]'
            onClick={() => {
              signUserOut();
            }}
          >
            Sign out
          </Button>

          <Button
            className='w-[100px]'
            onClick={() => {
              setOpenCheckout(false);
              setIsGettingCredit(false);
              setOpenTransferCredit(true);
            }}
          >
            Credit user
          </Button>
        </div>
      </div>

      <div className='max-w-lg m-auto'>
        <h1 className='mb-[20px]'>Transactions</h1>
        {transactions.map((transaction: any) => {
          return (
            <div className='mb-[20px]'>
              <p>Sender : {transaction?.sender_id}</p>
              <p>ID : {transaction?.trans_id}</p>
              <p>Amount : {transaction?.amount}</p>
            </div>
          );
        })}
      </div>

      {openTransferCredit && <TransferCredit platformUsers={platformUsers} />}

      {isGettingCredit && (
        <CheckoutForm handleOpenCheckout={handleOpenCheckout} />
      )}
      {openCheckout && (
        <div className='max-w-lg m-auto'>
          <StripeCheckout checkoutData={checkoutData} />
        </div>
      )}
    </WithAuthMiddleware>
  );
};

export default Home;
