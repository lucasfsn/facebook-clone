interface SpinnerProps {
  blur?: boolean;
}

function Spinner({ blur = true }: SpinnerProps) {
  return (
    <div
      className={`absolute inset-0 z-50 flex items-center justify-center ${
        blur ? "bg-slate-200/20 backdrop-blur-sm" : ""
      }`}
    >
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner;
