interface IProps {
  placeholder?: string;
  label?: string;
}

const Input = ({ placeholder, label }: IProps) => {
  return (
    <div className='max-w-96 w-full h-16 py-[8px] px-[1rem] bg-white rounded-lg border border-zinc-500 flex-col justify-start items-start inline-flex gap-[0.3rem]'>
      <span className="text-red-600 text-xs font-medium font-['Poppins'] leading-3 tracking-tight">
        {label} *
      </span>
      <input
        className="w-full h-[28px] appearance-none outline-0 max-h-full text-zinc-800 text-sm font-normal   placeholder:text-zinc-500 text-sm font-normal font-['Poppins'] "
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
