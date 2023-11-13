import {
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";
import Button from "./Button";

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
  children: React.ReactElement;
  opens: string;
}

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useContext(ModalContext) as ModalContextProps;

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

interface WindowProps {
  children: ReactNode;
  name: string;
}

function Window({ children, name }: WindowProps) {
  const { openName, close } = useContext(ModalContext) as ModalContextProps;

  const { ref } = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="w fixed bottom-0 left-0 right-0 top-0 backdrop-blur-sm">
      <div
        ref={ref}
        className="absolute left-1/2 top-1/2 flex w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white shadow-3xl"
      >
        <Button onClick={close}>
          <HiXMark className="absolute right-1 top-1 cursor-pointer text-2xl text-gray-500" />
        </Button>
        {children}
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
