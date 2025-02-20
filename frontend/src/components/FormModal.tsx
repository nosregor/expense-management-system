import React, { ChangeEvent, FormEvent, useState } from "react";
import { ExpenseCategory, IExpense } from "../types";
import Modal from "./Modal";

type FormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: IExpense) => void;
  initialData: IExpense | null;
};

const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<IExpense>(
    initialData
      ? initialData
      : {
          _id: "",
          description: "",
          amount: 0,
          category: ExpenseCategory.OFFICE,
        }
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = {
      ...formData,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _id: initialData ? formData._id : (null as any),
    };

    onSubmit(formDataToSend);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg text-center font-bold">
        {initialData?._id ? "Edit Expense" : "Create Expense"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-4 mb-4">
          <label className="block text-sm">Description</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            name="description"
            placeholder="i.e. Business trip to Hamburg"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <div className="mr-4 flex-1">
            <label className="block text-sm">Amount</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm">Category</label>
            <select
              className="w-full px-3 py-2 border rounded-lg"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {Object.values(ExpenseCategory).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            type="button"
            className="px-4 py-2 border border-gray-600 rounded-lg mr-2 w-24"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-lg ml-2 w-24"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FormModal;
