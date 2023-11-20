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
      className={`${className} icon-text hidden h-full flex-grow cursor-pointer items-center justify-center text-2xl ${
        active ? "active" : "icon-bg-hover rounded-lg"
      }`}
    >
      {children}
    </Link>
  );
}

export default HeaderLink;
