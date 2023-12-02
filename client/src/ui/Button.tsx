interface ButtonProps {
  className?: string;
  disabled?: boolean;
  children: string;
}

function Button({ className = "", disabled = false, children }: ButtonProps) {
  return (
    <button
      type="submit"
      className={`${className} rounded-lg px-4 py-1.5 text-lg font-bold text-white`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
