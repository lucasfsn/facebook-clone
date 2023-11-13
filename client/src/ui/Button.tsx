import { MouseEvent, ReactNode } from "react";

interface Props {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: ReactNode;
}

function Button({ onClick = () => {}, className = "", children }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${className} rounded-lg px-4 py-1.5 text-lg font-bold text-white`}
    >
      {children}
    </button>
  );
}

export default Button;
