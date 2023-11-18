import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  active: boolean;
  className: string;
  children: ReactNode;
}

function HeaderLink({ to, active, className, children }: Props) {
  return (
    <Link
      to={to}
      className={`${className} relative hidden h-full flex-grow cursor-pointer items-center justify-center text-2xl text-stone-600 hover:text-stone-700 ${
        active ? "active" : ""
      }`}
    >
      {children}
    </Link>
  );
}

export default HeaderLink;
