import { IExpense } from "../types";
import Modal from "./Modal";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (expense: IExpense) => void;
  selectedExpense: IExpense | null;
};

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  selectedExpense,
}: ConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <h2 className="text-lg font-bold">Delete expense?</h2>
        <p className="text-gray-700">
          Are you sure you want to delete this expense?
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            className="px-4 py-2 border border-gray-600 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          {selectedExpense && (
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
              onClick={() => onConfirm(selectedExpense)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
