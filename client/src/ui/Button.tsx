interface Props {
  className?: string;
  children: string;
}

function Button({ className = "", children }: Props) {
  return (
    <button
      type="submit"
      className={`${className} rounded-lg px-4 py-1.5 text-lg font-bold text-white`}
    >
      {children}
    </button>
  );
}

export default Button;
