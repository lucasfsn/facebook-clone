import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  right?: boolean;
  children: ReactNode;
}

function HeaderLink({ to, right = false, children }: Props) {
  return (
    <Link
      to={to}
      className={`relative flex cursor-pointer items-center justify-center text-2xl text-stone-600 hover:text-stone-700 ${
        right
          ? "h-[40px] min-w-[40px] rounded-full bg-gray-200 hover:bg-gray-300"
          : ""
      }`}
    >
      {children}
    </Link>
  );
}

export default HeaderLink;
