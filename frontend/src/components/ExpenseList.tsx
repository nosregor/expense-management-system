import type { IExpense } from "../types";
import ExpenseItem from "./ExpenseItem";
import TopBar from "./TopBar";

type ExpenseListProps = {
  expenses: IExpense[];
  openModal: () => void;
  openConfirmationModal: () => void;
  setSelectedExpense: (expense: IExpense) => void;
};

const tableHeader = ["Description", "Amount", "Category", "Actions"];

const ExpenseList = ({
  expenses,
  openModal,
  openConfirmationModal,
  setSelectedExpense,
}: ExpenseListProps) => {
  const handleEdit = (expense: IExpense) => {
    setSelectedExpense(expense);
    openModal();
  };

  const handleDelete = (expense: IExpense) => {
    setSelectedExpense(expense);
    openConfirmationModal();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl">
      <TopBar
        title="Expense Management System"
        buttonText="Create"
        onButtonClick={openModal}
      />

      <div className="sm:flex-auto">
        <p className="mt-2 text-sm text-gray-700">
          A list of all the expenses in your account including their
          description, amount and category.
        </p>
      </div>

      <div className="mt-8 border border-gray-200 rounded-lg overflow-hidden">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {tableHeader.map((title, index) => (
                      <th
                        key={index}
                        scope="col"
                        className={`py-3.5 text-left text-sm font-semibold text-gray-900 ${
                          index === 0 ? "pl-6 pr-3" : "px-3"
                        } ${
                          index === tableHeader.length - 1 ? "text-right" : ""
                        }`}
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {expenses.map((expense, index) => (
                    <ExpenseItem
                      key={index}
                      expense={expense}
                      handleEdit={() => handleEdit(expense)}
                      handleDelete={() => handleDelete(expense)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
