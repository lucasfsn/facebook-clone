import {
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface ModalContextProps {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

interface OpenProps {
  children: ReactElement;
  opens: string;
}

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useContext(ModalContext) as ModalContextProps;

  return cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      if (children.props.onClick) children.props.onClick(e);
      open(opensWindowName);
    },
  });
}

type WindowType = "center" | "custom";

interface WindowProps {
  children: ReactNode;
  name: string;
  type: WindowType;
  width?: string;
  onClose?: () => void;
}

function Window({
  children,
  name,
  type,
  width = "475px",
  onClose,
}: WindowProps) {
  const { openName, close } = useContext(ModalContext) as ModalContextProps;

  const { ref } = useOutsideClick(() => {
    close();
    onClose?.();
  });

  if (name !== openName) return null;

  const handleClose = () => {
    close();
    if (onClose) {
      onClose();
    }
  };

  if (type === "center") {
    return createPortal(
      <div className="fixed bottom-0 left-0 right-0 top-0 z-50 backdrop-blur-sm">
        <div
          ref={ref}
          style={{ width }}
          className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white shadow-3xl`}
        >
          <button onClick={handleClose}>
            <HiXMark className="absolute right-1 top-1 cursor-pointer text-2xl text-gray-500" />
          </button>
          {children}
        </div>
      </div>,
      document.body,
    );
  }

  return createPortal(
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50">
      <div ref={ref}>{children}</div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
