import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import type { IExpense } from "../types";

type ExpenseItemProps = {
  key: number;
  expense: IExpense;
  handleEdit: (expense: IExpense) => void;
  handleDelete: (expense: IExpense) => void;
};

const ExpenseItem = ({
  key,
  expense,
  handleEdit,
  handleDelete,
}: ExpenseItemProps) => (
  <tr key={key}>
    <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">
      {expense.description}
    </td>
    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      {`€ ${expense.amount}`}
    </td>
    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      {expense.category}
    </td>
    <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
      <button
        aria-label="edit"
        onClick={() => handleEdit(expense)}
        className="text-gray-500 hover:text-black transition-colors"
      >
        <MdModeEdit size={20} />
      </button>
      <button
        aria-label="delete"
        onClick={() => handleDelete(expense)}
        className="text-red-500 hover:text-red-700 transition-colors ml-2"
      >
        <FaTrash size={20} />
      </button>
    </td>
  </tr>
);

export default ExpenseItem;
