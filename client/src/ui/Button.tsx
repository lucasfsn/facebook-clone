interface ButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: string | JSX.Element;
}

function Button({
  className = "",
  disabled = false,
  onClick = () => {},
  children,
}: ButtonProps) {
  return (
    <button
      type="submit"
      className={`${className} rounded-lg px-4 py-1.5 text-lg font-bold text-white`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
