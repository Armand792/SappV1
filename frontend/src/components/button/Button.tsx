import { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';

interface IProps {
  icon?: ReactNode | any;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button = ({ icon, children, className, disabled = false }: IProps) => {
  return (
    <button
      className={classNames(
        'w-full max-w-96 h-[42px] py-2 bg-stone-50 rounded-xl justify-center items-center gap-2 !flex items-center gap-4 justify-center',
        className,
        disabled && '!bg-opacity-50'
      )}
    >
      {icon ?? typeof icon === 'function' ? icon() : icon}
      {children}
    </button>
  );
};

export default Button;
