interface InputProps {
  refs?:any;
  placeholder: string;
}

const Input = ({refs, placeholder}: InputProps) => {
  return (
    <div>
      <input
        placeholder={placeholder}
        type="text"
        className="px-4 py-2 rounded-md border border-slate-500 outline-none"
        ref={refs}
      />
    </div>
  );
};
export default Input;
