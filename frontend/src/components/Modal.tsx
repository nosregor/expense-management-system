import React from "react";
import { IoClose } from "react-icons/io5";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center
                        justify-center backdrop-filter "
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className="bg-white rounded-lg
                            shadow-lg p-6 max-w-md
                            w-full relative"
      >
        <button
          className="absolute top-2
                               right-2 text-gray-500
                               hover:text-gray-700"
          onClick={onClose}
        >
          <IoClose size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
