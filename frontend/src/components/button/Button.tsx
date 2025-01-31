import { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import { Loader } from '../loader/Loader';

interface IProps {
  icon?: ReactNode | any;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (event?: React.SyntheticEvent<any> | undefined) => void;
  isLoading?: boolean;
}

const Button = ({
  icon,
  children,
  className,
  disabled = false,
  type,
  onClick,
  isLoading = false,
  ...rest
}: IProps) => {
  return (
    <button
      onClick={disabled ? () => {} : onClick}
      type={type}
      className={classNames(
        'w-full max-w-96 h-[42px] py-2 bg-stone-50 rounded-xl justify-center items-center gap-2 !flex items-center gap-4 justify-center',
        className,
        disabled && '!bg-opacity-50'
      )}
    >
      {icon ?? typeof icon === 'function' ? icon() : icon}
      {children}
      {isLoading && <Loader color='white' />}
    </button>
  );
};

export default Button;
