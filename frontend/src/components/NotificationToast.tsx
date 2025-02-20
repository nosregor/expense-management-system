import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { ToastType } from "../types";

type NotificationToastProps = {
  message: string;
  type: ToastType;
  onClose: () => void;
};

export const NotificationToast = ({
  message,
  type,
  onClose,
}: NotificationToastProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const borderColor =
    type === ToastType.SUCCESS ? "border-green-600" : "border-red-600";
  const icon =
    type === ToastType.SUCCESS ? (
      <FaCircleCheck className="text-green-600" size={20} />
    ) : (
      <FaCircleXmark className="text-red-600" size={20} />
    );

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-x-0 bottom-0 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8"
    >
      <div className="flex w-full max-w-sm justify-center">
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`pointer-events-auto w-full overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 border-2 ${borderColor}`}
          >
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">{icon}</div>

                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">{message}</p>
                </div>

                <div className="ml-4 flex shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setShow(false);
                      onClose();
                    }}
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Close</span>
                    <IoClose size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default NotificationToast;
