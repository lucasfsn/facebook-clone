interface Props {
  className: string;
  children: string;
}

function Button({ className, children }: Props) {
  return (
    <div
      className={`${className} cursor-pointer rounded-lg px-4 py-2.5 text-lg font-bold text-white`}
    >
      {children}
    </div>
  );
}

export default Button;
