interface Props {
  type: "submit" | "reset";
  className?: string;
  children: string;
}

function ButtonForm({ type, className = "", children }: Props) {
  return (
    <button
      type={type}
      className={`${className} rounded-lg px-4 py-1.5 text-lg font-bold text-white`}
    >
      {children}
    </button>
  );
}

export default ButtonForm;
